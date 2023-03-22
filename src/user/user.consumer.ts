import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('user-queue')
export class UserConsumer {
  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(
      `User Job ${job.id} successfully completed with a result ${result}`,
    );
  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `User job ${job.id}  entered user queue with data ${JSON.stringify(
        job.data,
      )}`,
    );
  }
  @Process('register-job')
  async processRegister(job: Job) {
    const jobResult = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(`User with id ${job.data.user.id} registered`);
      }, 3000),
    );

    return jobResult;
  }
}
