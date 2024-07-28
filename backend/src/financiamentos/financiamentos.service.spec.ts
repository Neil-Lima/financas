import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamentosService } from './financiamentos.service';

describe('FinanciamentosService', () => {
  let service: FinanciamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanciamentosService],
    }).compile();

    service = module.get<FinanciamentosService>(FinanciamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
