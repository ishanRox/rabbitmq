import { DynamicModule, Module } from '@nestjs/common';
import { RabbitMqConfig } from './types/config';
import { RmqConsumerService } from './rmq-consumer.service';


@Module({})
export class RmqConsumerModule {
    static connectToRabbitMq(options: RabbitMqConfig): DynamicModule {

        return {
          module: RmqConsumerModule,
          providers: [
            {
              provide: RmqConsumerService,
              useValue: new RmqConsumerService(options)
            }
          ],
          exports: [
            RmqConsumerService
          ]
        };
      }

}
