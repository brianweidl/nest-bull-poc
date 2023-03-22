import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Mutation(() => Message)
  failMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.failCreate(createMessageInput);
  }

  @Mutation(() => Message)
  timeoutError(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.timeoutError(createMessageInput);
  }

  @Query(() => [Message])
  rootQuery() {
    return [];
  }
}
