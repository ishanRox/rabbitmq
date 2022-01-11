
import { RabbitSubscribe } from "../types/rabbit_subscribe";

const RabbitSubscribe = (rabbitSubscribe: RabbitSubscribe): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {

    const originalMethod = descriptor.value;

    descriptor.value = function () {
      const serviceInstance = this;
      serviceInstance.rmqService.initConsumer(rabbitSubscribe.queue, originalMethod);
    }

    return descriptor;
  }
};
export { RabbitSubscribe }