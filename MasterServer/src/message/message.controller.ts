import { Controller, Get, Post, Put, Body, Param, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MessageEntity, JobStatus } from './entities/message.entity';
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
    async addMessage(@Body() message: CreateMessageDto) {
      // if status not supplied add it.
      const msg = this.messageService.create({status: JobStatus.Created, ...message});
      // job_queue
      console.log(`Sending message: ${JSON.stringify(message)}`);
      await this.client.emit(msg.eventName, msg);
      return msg;
    }
  
    @Get(':id')
    async getMessageById(@Param('id') id: number) {
      const message = await this.messageService.get(+id);
      if (message === undefined) {
        throw new HttpException(`Message id ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return message;
    }

    @EventPattern('job_queue_update')
    async updateMessage(message: MessageEntity) {
      console.log(`Received updated status: ${message.status} for job_id ${message.id}`)
      await this.messageService.updateAsync(message);
    }
}
