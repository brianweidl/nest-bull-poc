import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => User)
  registerUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    this.usersService.registerUser(createUserInput);
    return createUserInput;
  }
}
