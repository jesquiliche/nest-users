import { Injectable, BadRequestException, Query } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { Anuncio } from './entities/anuncio.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Poblacion } from 'src/poblaciones/entities/poblaciones.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginateDto } from './dto/pagination-dto';

@Injectable()
export class AnunciosService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Anuncio)
    private anunciosRepository: Repository<Anuncio>,

    @InjectRepository(Subcategoria)
    private subcategoriasRepository: Repository<Subcategoria>,

    @InjectRepository(Estado)
    private estadosRepository: Repository<Estado>,

    @InjectRepository(Provincia)
    private provinciasRepository: Repository<Provincia>,

    @InjectRepository(Poblacion)
    private poblacionesRepository: Repository<Poblacion>,
  ) {}

  async create(createAnuncioDto: CreateAnuncioDto) {
    const { user, subcategoria, estado, provincia, cod_postal } =
      createAnuncioDto;

    const userObj = await this.usersRepository.findOne({
      where: [{ email: user }],
    });

    if (!userObj) {
      throw new BadRequestException(`Usuario con E-mail ${user} no encontrada`);
    }

    const subcategoriaObj = await this.subcategoriasRepository.findOne({
      where: [{ nombre: subcategoria }],
    });

    if (!subcategoriaObj) {
      throw new BadRequestException(
        `Subcategoría con nombre ${subcategoria} no encontrada`,
      );
    }

    const estadoObj = await this.estadosRepository.findOne({
      where: [{ titulo: estado }],
    });

    if (!estadoObj) {
      throw new BadRequestException(
        `Estado con nombre ${estado} no encontrada`,
      );
    }

    const provinciaObj = await this.provinciasRepository.findOne({
      where: [{ codigo: provincia }],
    });

    if (!provinciaObj) {
      throw new BadRequestException(
        `Provincia con código ${provincia} no encontrada`,
      );
    }

    const poblacionObj = await this.poblacionesRepository.findOne({
      where: [{ codigo: cod_postal }],
    });

    if (!poblacionObj) {
      throw new BadRequestException(
        `Poblacion con código ${cod_postal} no encontrada`,
      );
    }

    const nuevoAnuncio = this.anunciosRepository.create({
      titulo: createAnuncioDto.titulo,
      description: createAnuncioDto.description,
      imagen: createAnuncioDto.imagen,
      precio: createAnuncioDto.precio,
      telefono: createAnuncioDto.telefono,
      subcategoria: subcategoriaObj,
      estado: estadoObj,
      user: userObj,
      provincia: createAnuncioDto.provincia,
      cod_postal: createAnuncioDto.cod_postal,
      poblacion: poblacionObj,
    });

    return await this.anunciosRepository.save(nuevoAnuncio);
  }

  async findAll(params?: PaginateDto) {
    const queryBuilder = this.anunciosRepository.createQueryBuilder('anuncios');
  
    if (params.limit && params.page) {
      // Inicializa el queryBuilder con joins para las relaciones
      let dynamicQueryBuilder = queryBuilder
        .innerJoinAndSelect('anuncios.subcategoria', 'subcategoria')
        .innerJoinAndSelect('subcategoria.categoria', 'categoria')
        .innerJoinAndSelect('anuncios.estado', 'estado')
        .innerJoinAndSelect('anuncios.user', 'user')
        .innerJoinAndSelect('anuncios.poblacion', 'poblacion');
  
      // Aplica el filtro de subcategoría si se proporciona
      if (params.subcategoria) {
        dynamicQueryBuilder = dynamicQueryBuilder.where(
          'subcategoria.nombre LIKE :subcategoria',
          {
            subcategoria: `%${params.subcategoria}%`,
          },
        );
      }
  
      // Aplica el filtro de estado si se proporciona
      if (params.estado) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'estado.titulo = :estado',
          {
            estado: params.estado,
          },
        );
      }
  
      // Aplica el filtro de email_usuario si se proporciona
      if (params.email_usuario) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'user.email = :email_usuario',
          {
            email_usuario: params.email_usuario,
          },
        );
      }
  
      // Aplica el filtro de cod_postal si se proporciona
      if (params.cod_postal) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'poblacion.codigo = :cod_postal',
          {
            cod_postal: params.cod_postal,
          },
        );
      }
  
      // Aplica el filtro de provincia si se proporciona
      if (params.provincia) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'anuncios.provincia = :provincia',
          {
            provincia: params.provincia,
          },
        );
      }
  
      // Aplica el filtro de título si se proporciona
      if (params.titulo) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'anuncios.titulo LIKE :titulo',
          {
            titulo: `%${params.titulo}%`,
          },
        );
      }

       // Aplica el filtro de categoría si se proporciona
       if (params.categoria) {
        dynamicQueryBuilder = dynamicQueryBuilder.andWhere(
          'categoria.nombre LIKE :categoria',
          {
            categoria: `%${params.categoria}%`,
          },
        );
      }
  
  
      // Obtiene el total de anuncios para la paginación
      const totalCount = await queryBuilder.getCount();
      const totalPages = Math.ceil(totalCount / +params.limit);
  
      // Aplica la paginación
      if (totalPages > +params.page - 1)
        dynamicQueryBuilder = dynamicQueryBuilder.skip(
          (+params.page - 1) * +params.limit,
        );
  
      dynamicQueryBuilder = dynamicQueryBuilder.take(+params.limit);
  
      // Obtiene los resultados finales
      const result = await dynamicQueryBuilder.getMany();
  
      return {
        totalPages,
        records: totalCount,
        data: result,
      };
    }
  
  
    const result = await this.anunciosRepository.find({});
    return {
      data: result,
    };
  }

  async findOne(id: number) {
    return await this.anunciosRepository.findOneBy({ id });
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  async remove(id: number) {
    return await this.anunciosRepository.softDelete(id);
  }
}
