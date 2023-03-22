import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MessageService {
  constructor(@InjectQueue('message-queue') private messageQueue: Queue) {}
  async create(createMessageInput: CreateMessageInput) {
    const job = await this.messageQueue.add('message-job', createMessageInput, {
      attempts: 3,
    });

    return job.data;
  }

  async failCreate(createMessageInput: CreateMessageInput) {
    const job = await this.messageQueue.add(
      'message-error',
      createMessageInput,
      {
        attempts: 3,
      },
    );

    return job.data;
  }

  async timeoutError(createMessageInput: CreateMessageInput) {
    const job = await this.messageQueue.add(
      'message-error',
      createMessageInput,
      {
        timeout: 2000,
      },
    );
    return job.data;
  }
}
