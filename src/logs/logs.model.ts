import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Log {
  @Field(() => ID)
  _id: string;

  @Field()
  action: string;

  @Field()
  level: 'INFO' | 'WARN' | 'ERROR';

  @Field()
  message: string;

  @Field({ nullable: true })
  context?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, any>;

  @Field()
  createdAt: Date;
}
