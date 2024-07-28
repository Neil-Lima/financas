import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamentosController } from './financiamentos.controller';
import { FinanciamentosService } from './financiamentos.service';

describe('FinanciamentosController', () => {
  let controller: FinanciamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanciamentosController],
      providers: [FinanciamentosService],
    }).compile();

    controller = module.get<FinanciamentosController>(FinanciamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
