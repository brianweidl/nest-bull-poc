import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './user.consumer';

//Didn't let me register queue on AppModule
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user-queue',
    }),
  ],
  providers: [UserResolver, UserService, UserConsumer],
})
export class UserModule {}
