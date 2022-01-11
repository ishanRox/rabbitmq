import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqConsumerModule } from './rmq-consumer/rmq-consumer.module';

@Module({
  imports: [
    RmqConsumerModule.connectToRabbitMq({
      url: "amqps://sxkayomg:phGJceWuzPIlxmVBXb4rAEsvJGdxlf3g@chimpanzee.rmq.cloudamqp.com/sxkayomg", 
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
