import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';
import { Subcategoria } from './entities/subcategoria.entity';


@Injectable()
export class SubcategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,

    @InjectRepository(Subcategoria)
    private subcategoriasRepository: Repository<Subcategoria>,
  ) {}


 async create(createSubcategoriaDto: CreateSubcategoriaDto) {
    const categoria_id=createSubcategoriaDto.categoria_id;
    const categoria=await this.categoriasRepository.findOne({
      where: [
        { id: categoria_id },
      ]});
    
    if (!categoria) {
      
      throw new BadRequestException(`Categoría con ID ${categoria_id} no encontrada`);
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
    const categoria_id=updateSubcategoriaDto.categoria_id;
    const categoria=await this.categoriasRepository.findOne({
      where: [
        { id: categoria_id },
      ]});
    
    if (!categoria) {
      
      throw new BadRequestException(`Categoría con ID ${categoria_id} no encontrada`);
    }

    return await this.subcategoriasRepository.save({
      ...updateSubcategoriaDto,
      categoria
    });
    

  }

  remove(id: number) {
    return `This action removes a #${id} subcategoria`;
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
}
