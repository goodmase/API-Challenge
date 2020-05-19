import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

export enum JobStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed'
}


export interface JobObject {
  id: number;
  name: string;
  eventName: string;
  message: JSON;
  status: JobStatus;
}

@Controller()
export class AppController {
  @EventPattern('job_queue')
  async handleMessagePrinted(data: Record<string, JobObject>) {
    console.log("received message!");
    console.log(data);
    // TODO send update message
    // TODO wait for x ms
    // TODO send complete message
  }
}
