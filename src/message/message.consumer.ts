import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Message Job ${job.id} successfully completed`);
  }

  @OnQueueFailed()
  onJobFailed(job: Job, error: Error) {
    console.log(`Job ${job.id} error: ${error}`);
  }

  @OnQueueError()
  onError(error: Error) {
    console.log(`Queue error: ${error}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    if (job.attemptsMade > 0) {
      console.log(`Message job ${job.id} retry`);
      return;
    }
    console.log(
      `Message job ${job.id} entered message queue with data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }
  @Process('message-job')
  async processMessage(job: Job) {
    const jobResult = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(`Job ${job.id} processed!`);
      }, 3000),
    );
    return jobResult;
  }

  @Process('message-error')
  async processMessageError() {
    return await new Promise((resolve, reject) =>
      setTimeout(() => {
        reject('An error ocurred!');
      }, 3000),
    );
  }
}
