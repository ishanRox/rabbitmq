import { createParamDecorator, Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqConfig } from './types/config';
import { ExchangeOptions } from './types/exchange-option';

//amqplib used as a base package
//https://www.npmjs.com/package/amqplib

@Injectable()
export class RmqConsumerService implements OnModuleInit {

    private readonly rabbitmQconfig: RabbitMqConfig;

    constructor(config: RabbitMqConfig) {
        this.rabbitmQconfig = config;
    }


    onModuleInit() { 
    }

    initConsumer(queue:string,consumerCallback?: any,exchangeOption?: ExchangeOptions) {
        const amqp = require('amqplib');
        const url = this.rabbitmQconfig.url;
        const assertExchange = exchangeOption;

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
