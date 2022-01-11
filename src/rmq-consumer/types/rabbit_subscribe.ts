import { ExchangeOptions } from "./exchange-option";

export interface RabbitSubscribe {
    queue:string;
    exchangeOption?: ExchangeOptions
}