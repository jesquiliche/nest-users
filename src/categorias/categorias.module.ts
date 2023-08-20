import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Categoria,Subcategoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [TypeOrmModule],
})
export class CategoriasModule {}
