import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../entities/message.entity';

export class CreateMessageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  eventName: string;

  @ApiProperty()
  message: JSON;

  @ApiProperty({ default: JobStatus.Created, enum: JobStatus })
  status: JobStatus;
}
