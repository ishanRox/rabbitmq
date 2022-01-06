import { createParamDecorator, Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqConfig } from './config/config';
const amqp = require('amqplib/callback_api');


@Injectable()
export class RmqConsumerService implements OnModuleInit {

    private readonly rabbitmQconfig: RabbitMqConfig;

    constructor(config: RabbitMqConfig) {
        this.rabbitmQconfig = config;
    }

    
    onModuleInit() {
        //remove this if other service call initConsumer
        this.initConsumer();
    }

    initConsumer(consumerCallback?:any) {
        const queue = this.rabbitmQconfig.queue;
        const url = this.rabbitmQconfig.url;
        amqp.connect(url, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                channel.assertQueue(queue, {
                    durable: true
                });
                channel.prefetch(1);

                channel.consume(queue, function (msg) {
                    if (consumerCallback) {
                        consumerCallback(msg); 
                    } else {
                        console.log("Received '%s'", msg.content.toString());
                    }
                    setTimeout(function () {
                        channel.ack(msg);
                    }, 1000);
                });
            });
        });
    }

     
}
