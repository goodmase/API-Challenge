import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

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
    transport: Transport.TCP
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();