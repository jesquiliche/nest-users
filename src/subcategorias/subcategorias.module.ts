import { Module } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasController } from './subcategorias.controller';
import { Subcategoria } from './entities/subcategoria.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasModule } from 'src/categorias/categorias.module';
import { CategoriasService } from 'src/categorias/categorias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria]),CategoriasModule],
  controllers: [SubcategoriasController],
  providers: [SubcategoriasService,CategoriasService],
  exports : [TypeOrmModule]
})
export class SubcategoriasModule {}
