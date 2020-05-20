import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const RABBITMQ_CONNECTION_STRING =
  process.env.RABBITMQ_CONNECTION_STRING ||
  'amqp://guest:guest@localhost:5672/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Message Server')
    .setDescription('API for Sending / Receiving Messages')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONNECTION_STRING],
      queue: 'user-messages-update',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
