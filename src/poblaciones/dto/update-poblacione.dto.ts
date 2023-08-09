import { PartialType } from '@nestjs/mapped-types';
import { CreatePoblacioneDto } from './create-poblacione.dto';

export class UpdatePoblacioneDto extends PartialType(CreatePoblacioneDto) {}
