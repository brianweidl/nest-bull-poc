import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  message: string;
}
