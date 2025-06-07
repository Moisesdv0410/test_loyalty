import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { TransactionType } from '../enums/transaction-type.enum';

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

@ObjectType()
export class TransactionDTO {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string; // renombrado para GraphQL

  @Field(() => TransactionType)
  type: TransactionType;

  @Field()
  points: number;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  rewardId?: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description?: string;
}
