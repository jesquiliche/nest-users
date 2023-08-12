import { Module } from '@nestjs/common';
import { PoblacionesService } from './poblaciones.service';
import { PoblacionesController } from './poblaciones.controller';
import { Poblacion } from './entities/poblaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Poblacion])],
  controllers: [PoblacionesController],
  providers: [PoblacionesService]
})
export class PoblacionesModule {}
