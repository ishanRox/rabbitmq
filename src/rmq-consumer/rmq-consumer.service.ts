import { createParamDecorator, Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqConfig } from './config/config';
const amqp = require('amqplib');
//amqplib used as a base package
//https://www.npmjs.com/package/amqplib

@Injectable()
export class RmqConsumerService implements OnModuleInit {

    private readonly rabbitmQconfig: RabbitMqConfig;

    constructor(config: RabbitMqConfig) {
        this.rabbitmQconfig = config;
    }


    onModuleInit() {
        //remove this if other service call initConsumer
         
        this.initConsumer((msg, consumerData) => {
            console.log('our function with some other stuff');
            console.log(consumerData, 'consumerData');
            console.log(msg, 'msg');
        });
    }

    initConsumer(consumerCallback?: any) {

        const url = this.rabbitmQconfig.url;
        const queue = this.rabbitmQconfig.queue;
        const assertExchange = this.rabbitmQconfig.exchangeOption;

        const open = amqp.connect(url);

        open.then((conn) => {
            return conn.createChannel();
        }).then((channel) => {

            // create exchange
            if (assertExchange) {
                channel.assertExchange(assertExchange.exchange, assertExchange.type, assertExchange.options)
            }

            return channel.consume(queue, (publishedData) => {
                if (publishedData !== null) {
                    const message: string = publishedData.content.toString();
                    const metadata = publishedData;

                    if (consumerCallback) {
                        consumerCallback(message, metadata)
                    } else {
                        console.log(message);
                    }
                    channel.ack(publishedData);
                }
            });
        }).catch(console.warn);
    }


}
