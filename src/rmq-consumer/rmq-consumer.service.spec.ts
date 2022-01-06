import { Test, TestingModule } from '@nestjs/testing';
import { RmqConsumerService } from './rmq-consumer.service';

describe('RmqConsumerService', () => {
  let service: RmqConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RmqConsumerService],
    }).compile();

    service = module.get<RmqConsumerService>(RmqConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
