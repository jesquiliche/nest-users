import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { Anuncio } from './entities/anuncio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnunciosController],
  providers: [AnunciosService]
})
export class AnunciosModule {}
