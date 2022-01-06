import { createParamDecorator, Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqConfig } from './config/config';
const amqp = require('amqplib');


@Injectable()
export class RmqConsumerService implements OnModuleInit {

    private readonly rabbitmQconfig: RabbitMqConfig;

    constructor(config: RabbitMqConfig) {
        this.rabbitmQconfig = config;
    }


    onModuleInit() {
        //remove this if other service call initConsumer
        this.initConsumer((consumerData) => {
            console.log('our function with some other stuff');
            console.log(consumerData, 'message');
        });
    }

    initConsumer(consumerCallback?: any) {

        const url = this.rabbitmQconfig.url;

        const queue = this.rabbitmQconfig.queue;

        const open = amqp.connect(url);


        // Consumer
        open.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
                return ch.consume(queue, function (publishedData) {
                    if (publishedData !== null) {
                        if (consumerCallback) {
                            consumerCallback(publishedData)
                        } else {
                            console.log(publishedData.content.toString());
                        }
                        ch.ack(publishedData);
                    }
                });
        }).catch(console.warn);
    }


}
