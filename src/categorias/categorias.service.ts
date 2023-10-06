import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoriasData } from 'src/data/categorias'

@Injectable()
export class CategoriasService {
  
    constructor(
      @InjectRepository(Categoria)
      private categoriasRepository: Repository<Categoria>,

      @InjectRepository(Subcategoria)
      private subcategoriasRepository: Repository<Subcategoria>,
    ) {}
  

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria =this.categoriasRepository.create(createCategoriaDto);
    return await this.categoriasRepository.save(categoria);

  }

  async findAll() {
   return await this.categoriasRepository.createQueryBuilder('categoria').orderBy('categoria.nombre', 'ASC')
      .getMany();
  
  }

  async findOne(id: number) {
    return await this.categoriasRepository.findOneBy({ id });
  }

  async obtenerSubcategoriasDeCategoria(categoriaId: number): Promise<Subcategoria[]> {
    const subcategorias = await this.subcategoriasRepository
      .createQueryBuilder('subcategoria')
      .where('subcategoria.categoriaId = :categoriaId', { categoriaId: categoriaId })
      .getMany();

    if (!subcategorias || subcategorias.length === 0) {
      throw new NotFoundException(`No se encontraron subcategorías para la categoría con ID ${categoriaId}`);
    }

    return subcategorias;
  }


  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.categoriasRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    return await this.categoriasRepository.softDelete(id);
  }

  async poblar(): Promise<any> {
    for (const data of categoriasData) {
      await this.categoriasRepository.save(this.categoriasRepository.create(data));
    }
    return 'Categorías insertadas correctamente';
  }
}
