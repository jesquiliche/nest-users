import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { Anuncio } from './entities/anuncio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriasModule } from 'src/subcategorias/subcategorias.module';
import { EstadosModule } from 'src/estados/estados.module';
import { ProvinciasModule } from 'src/provincias/provincias.module';
import { PoblacionesModule } from 'src/poblaciones/poblaciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio]),
    SubcategoriasModule,
    EstadosModule,
    ProvinciasModule,
    PoblacionesModule],
  controllers: [AnunciosController],
  providers: [AnunciosService]
})
export class AnunciosModule {}
