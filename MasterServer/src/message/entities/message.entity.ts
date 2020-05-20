import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export enum JobStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed',
}

export interface MessageEntity extends InMemoryDBEntity {
  name: string;
  eventName: string;
  message: JSON;
  status: JobStatus;
}
