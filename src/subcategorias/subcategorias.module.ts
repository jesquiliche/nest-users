import { Module } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasController } from './subcategorias.controller';
import { Subcategoria } from './entities/subcategoria.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria])],
  controllers: [SubcategoriasController],
  providers: [SubcategoriasService]
})
export class SubcategoriasModule {}
