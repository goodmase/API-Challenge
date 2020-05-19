import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [MessageModule]
})
export class AppModule {}
