import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { MessageController } from './message.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [InMemoryDBModule.forFeature('message'), ClientsModule.register([
    { name: 'JOB_SERVICE', transport: Transport.TCP },
  ])],
  controllers: [MessageController]
})
export class MessageModule {}
