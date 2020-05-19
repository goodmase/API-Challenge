import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  message: string;
}