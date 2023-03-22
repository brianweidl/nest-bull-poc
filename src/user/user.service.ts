import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { User } from './entities/user.entity';
import { Queue } from 'bull';

@Injectable()
export class UserService {
  constructor(@InjectQueue('user-queue') private userQueue: Queue) {}

  async registerUser(user: User) {
    await this.userQueue.add('register-job', {
      user,
    });
  }
}
