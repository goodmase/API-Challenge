import { Controller, Get, Post, Put, Body, Param, Inject } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/message.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('message')
export class MessageController {
    constructor(@Inject('JOB_SERVICE') private readonly client: ClientProxy, private readonly messageService: InMemoryDBService<MessageEntity>, ) {}
    
    async onApplicationBootstrap() {
        await this.client.connect();
    }

    @Get()
    getMessages() {
      return this.messageService.getAll();
    }
  
    @Post()
    addMessage(@Body() message: CreateMessageDto) {
      const msg = this.messageService.create(message);
      // job_created
      this.client.emit(msg.eventName, msg);
      return msg;
    }
  
    @Get(':id')
    getMessageById(@Param('id') id: number) {
      return this.messageService.get(+id);
    }

    @Put(':id')
    editMessage(@Param('id') id: number, @Body() message: CreateMessageDto) {
      const messageWithId: MessageEntity = {id, ...message};
      this.messageService.update(messageWithId);
      return this.messageService.get(+id)
    }

    @EventPattern('job_updated')
    async updateMessage(message: MessageEntity) {
      await this.messageService.updateAsync(message);
    }
}
