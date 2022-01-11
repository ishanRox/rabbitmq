import { Controller, OnModuleInit } from '@nestjs/common';
import { RabbitSubscribe } from './rmq-consumer/decorator/function-decorator';
import { RmqConsumerService } from './rmq-consumer/rmq-consumer.service';

@Controller()
export class AppController implements OnModuleInit {
  //must inject the rmqServicer in constructor
  //and call method in onModuleInit
  //Name must be rmqService
  constructor(private readonly rmqService: RmqConsumerService) { }

  onModuleInit() {
    //To invoke the methods and decorators
    this.rmqConsumer1('', '');
    this.rmqConsumer2('', '');
  }


  @RabbitSubscribe(
    {
      queue: 'poc_queue'

    })
  rmqConsumer1(msg, metadata) {
    console.log(msg, 'Consumer1');
  }

  @RabbitSubscribe(
    {
      queue: 'poc_queue1',
      exchangeOption: {
        exchange: "processing",
        type: "direct",
        options: { durable: true, autoDelete: true }
      }
    }


  )
  rmqConsumer2(msg, metadata) {
    console.log(msg, 'Consumer2');
  }
}
