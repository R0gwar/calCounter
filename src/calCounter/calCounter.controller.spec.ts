import { Test, TestingModule } from '@nestjs/testing';
import { calCounterController } from './calCounter';

describe('calCounterController', () => {
  let controller: calCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [calCounterController],
    }).compile();

    controller = module.get<calCounterController>(calCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
