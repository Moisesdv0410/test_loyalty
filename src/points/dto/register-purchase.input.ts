import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, Min } from 'class-validator';

@InputType()
export class RegisterPurchaseInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  amount: number;
}
