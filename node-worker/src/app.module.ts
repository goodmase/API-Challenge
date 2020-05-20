import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';

const RABBITMQ_CONNECTION_STRING =
  process.env.RABBITMQ_CONNECTION_STRING ||
  'amqp://guest:guest@localhost:5672/';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JOB_SERVICE_UPDATE',
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_CONNECTION_STRING],
          queue: 'user-messages-update',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
