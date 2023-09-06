import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosController } from './fotos.controller';
import { Foto } from './entities/foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnunciosModule } from 'src/anuncios/anuncios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Foto]),AnunciosModule],
  controllers: [FotosController],
  providers: [FotosService],
  exports: [TypeOrmModule],
})
export class FotosModule {}
