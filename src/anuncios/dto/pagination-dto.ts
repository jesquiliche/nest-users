import {
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class PaginateDto {
   
    @IsOptional()
    limit:number;

    @IsOptional()
    page:number;

  
}
