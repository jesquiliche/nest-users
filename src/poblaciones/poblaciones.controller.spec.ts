import { Test, TestingModule } from '@nestjs/testing';
import { PoblacionesController } from './poblaciones.controller';
import { PoblacionesService } from './poblaciones.service';

describe('PoblacionesController', () => {
  let controller: PoblacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoblacionesController],
      providers: [PoblacionesService],
    }).compile();

    controller = module.get<PoblacionesController>(PoblacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
