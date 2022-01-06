import { Controller, OnModuleInit } from '@nestjs/common';
import { RmqConsumerService } from './rmq-consumer/rmq-consumer.service';

@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly rmqService: RmqConsumerService) {}
  
  onModuleInit() {
    // this.getConsumerData();
  }

  // getConsumerData(){
  //   this.rmqService.initConsumer((msg)=>{
  //     console.log("Received data to overrided method  '%s'", msg.content.toString());
  //   });
  // }


}
