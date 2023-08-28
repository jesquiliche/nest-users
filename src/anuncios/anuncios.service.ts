import { Injectable,BadRequestException, Query } from '@nestjs/common';
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
    const {user,subcategoria,estado,provincia,cod_postal}=createAnuncioDto;

    const userObj=await this.usersRepository.findOne({where: [
      { email: user },
    ]})

    if (!userObj) {
      throw new BadRequestException(`Usuario con E-mail ${user} no encontrada`);
    }

    const subcategoriaObj=await this.subcategoriasRepository.findOne({where: [
      { nombre: subcategoria },
    ]})

    if (!subcategoriaObj) {
      throw new BadRequestException(`Subcategoría con nombre ${subcategoria} no encontrada`);
    }

    const estadoObj=await this.estadosRepository.findOne({where: [
      { titulo: estado },
    ]})

    if (!estadoObj) {
      throw new BadRequestException(`Estado con nombre ${estado} no encontrada`);
    }

    const provinciaObj=await this.provinciasRepository.findOne({where: [
      { codigo: provincia },
    ]})

    if (!provinciaObj) {
      throw new BadRequestException(`Provincia con código ${provincia} no encontrada`);
    }
  
    const poblacionObj=await this.poblacionesRepository.findOne({where: [
      { codigo: cod_postal },
    ]})

    if (!poblacionObj) {
      throw new BadRequestException(`Poblacion con código ${cod_postal} no encontrada`);
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

 async findAll(params?:PaginateDto)
  {
   

    const queryBuilder = this.anunciosRepository.createQueryBuilder("anuncios");
   
    const totalCount = await queryBuilder.getCount(); // Obtener el total de anuncios
    const totalPages = Math.ceil(totalCount / +params.limit); // Calcular el número total de páginas

    if (+params.page > totalPages) {
      // Comprobar si el valor de page excede el número de páginas
      throw new BadRequestException('El número de página excede el límite.');
    }
 
    if (params.limit && params.page) {
      const { limit, page } = params;
      queryBuilder
      .leftJoinAndSelect('anuncios.subcategoria', 'subcategoria')
      .leftJoinAndSelect('anuncios.estado', 'estado')
      .leftJoinAndSelect('anuncios.user', 'user')
      .leftJoinAndSelect('anuncios.poblacion', 'poblacion')
      .skip(+params.page-1*params.limit)
      .take(+params.limit).getMany;

      const result = await queryBuilder.getMany();

      return {
          totalPages: totalPages,
          data: result, // Agregar el número total de páginas al objeto de respuesta
      };
    }
       
    return  await this.anunciosRepository.find({});
  }

  
  findOne(id: number) {
    return `This action returns a #${id} anuncio`;
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  remove(id: number) {
    return `This action removes a #${id} anuncio`;
  }
}
