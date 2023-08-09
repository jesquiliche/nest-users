import { Injectable } from '@nestjs/common';
import { CreatePoblacioneDto } from './dto/create-poblacione.dto';
import { UpdatePoblacioneDto } from './dto/update-poblacione.dto';

@Injectable()
export class PoblacionesService {
  create(createPoblacioneDto: CreatePoblacioneDto) {
    return 'This action adds a new poblacione';
  }

  findAll() {
    return `This action returns all poblaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poblacione`;
  }

  update(id: number, updatePoblacioneDto: UpdatePoblacioneDto) {
    return `This action updates a #${id} poblacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} poblacione`;
  }
}
