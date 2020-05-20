import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

export enum JobStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed'
}


export interface JobObject {
  id: number;
  name: string;
  eventName: string;
  message: { workLengthMs: number };
  status: JobStatus;
}

@Controller()
export class AppController {
  constructor(@Inject('JOB_SERVICE_UPDATE') private readonly client: ClientProxy){}
  
  async onApplicationBootstrap() {
    await this.client.connect();
  }
  
  @EventPattern('job_queue')
  async handleMessagePrinted(job: JobObject) {
    console.log(`Received job_id ${job.id}`);
    await this.client.emit("job_queue_update", {...job, status: JobStatus.Running});
    console.log(`Doing work for job_id ${job.id} for ${job.message.workLengthMs} ms`)
    setTimeout(async ()=>{
      console.log(`Completed work for job_id ${job.id}`);
      await this.client.emit("job_queue_update", {...job, status: JobStatus.Completed});
    }, +job.message.workLengthMs);
  }
}
