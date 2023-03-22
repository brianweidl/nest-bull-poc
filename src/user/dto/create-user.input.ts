import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  status: string;
}
