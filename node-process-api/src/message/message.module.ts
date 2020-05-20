import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { MessageController } from './message.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';

const RABBITMQ_CONNECTION_STRING =
  process.env.RABBITMQ_CONNECTION_STRING ||
  'amqp://guest:guest@localhost:5672/';

@Module({
  imports: [
    InMemoryDBModule.forFeature('message'),
    ClientsModule.register([
      {
        name: 'JOB_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_CONNECTION_STRING],
          queue: 'user-messages',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MessageController],
})
export class MessageModule {}
