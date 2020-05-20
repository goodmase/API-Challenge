import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const RABBITMQ_CONNECTION_STRING =
  process.env.RABBITMQ_CONNECTION_STRING ||
  'amqp://guest:guest@localhost:5672/';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONNECTION_STRING],
      queue: 'user-messages',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen(() => console.log('node-worker is listening'));
}
bootstrap();
