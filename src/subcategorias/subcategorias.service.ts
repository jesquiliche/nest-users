import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';
import { Subcategoria } from './entities/subcategoria.entity';
import { subcategoriasData } from 'src/data/subcategorias';


@Injectable()
export class SubcategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,

    @InjectRepository(Subcategoria)
    private subcategoriasRepository: Repository<Subcategoria>,
  ) {}


 async create(createSubcategoriaDto: CreateSubcategoriaDto) {
    const categoria1=createSubcategoriaDto.categoria;
    const categoria=await this.categoriasRepository.findOne({
      where: [
        { nombre: categoria1 },
      ]});
    
    if (!categoria) {
      
      throw new BadRequestException(`Categoría con nombre ${categoria1} no encontrada`);
    }

    return await this.subcategoriasRepository.save({
      ...createSubcategoriaDto,
      categoria
    });
    
  }

  async findAll() {
    return await this.subcategoriasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategoria`;
  }

  async update(id: number, updateSubcategoriaDto: UpdateSubcategoriaDto) {
    const categoria1 = updateSubcategoriaDto.categoria;
    const categoria=await this.categoriasRepository.findOne({
      where: [
        { nombre: categoria1 },
      ]});
    
    if (!categoria) {
      throw new BadRequestException(`Categoría con nombre ${categoria1} no encontrada`);
    }
  
    const subcategoria = await this.subcategoriasRepository.findOne({
      where: [
        { id },
      ]});
    
    if (!subcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
  
    const updatedSubcategoria = {
      ...subcategoria,
      ...updateSubcategoriaDto,
      categoria,
    };
  
    return await this.subcategoriasRepository.save(updatedSubcategoria);
  }
  

  async remove(id: number) {
    return await this.subcategoriasRepository.softDelete(id);
  }

  async obtenerSubcategoriasDeCategoria(categoriaId: number): Promise<Subcategoria[]> {
    const subcategorias = await this.subcategoriasRepository
      .createQueryBuilder('subcategoria')
      .where('subcategoria.categoriaId = :categoriaId', { categoriaId: categoriaId })
        .orderBy('subcategoria.nombre','ASC')
      .getMany();

    if (!subcategorias || subcategorias.length === 0) {
      throw new NotFoundException(`No se encontraron subcategorías para la categoría con ID ${categoriaId}`);
    }

    return subcategorias;
  }

  async poblar(): Promise<any> {
    for (const data of subcategoriasData) {
      
      const categoria=await this.categoriasRepository.findOne({
        where: [
          { nombre: data.categoria },
        ]});
      
     
      if (!categoria) {
        throw new BadRequestException(`Categoría con Nombre ${data.categoria} no encontrada`);
      }
      let subcategoria={...data,categoria};
      await this.subcategoriasRepository.save(this.subcategoriasRepository.create(subcategoria));
    }
    return 'Subcategorías insertadas correctamente';
  }
}
