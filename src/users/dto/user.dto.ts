import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
