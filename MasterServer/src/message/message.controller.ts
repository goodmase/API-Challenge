import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
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
      this.client.emit('job_created', msg);
      return msg;
    }
  
    @Get(':id')
    getMessageById(@Param('id') id: number) {
      return this.messageService.query(data => data.id === +id)
    }

    @EventPattern('job_updated')
    async updateMessage(message: MessageEntity) {
      await this.messageService.updateAsync(message);
    }
}
