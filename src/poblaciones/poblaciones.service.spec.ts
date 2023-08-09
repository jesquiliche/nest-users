import { Test, TestingModule } from '@nestjs/testing';
import { PoblacionesService } from './poblaciones.service';

describe('PoblacionesService', () => {
  let service: PoblacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoblacionesService],
    }).compile();

    service = module.get<PoblacionesService>(PoblacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
