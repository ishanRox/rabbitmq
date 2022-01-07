import { ExchangeOptions } from "./config-type/exchange-option";

export interface RabbitMqConfig {
  url: string;
  queue: string;
  exchangeOption?: ExchangeOptions
}