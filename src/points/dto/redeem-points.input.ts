import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, IsOptional, IsString } from 'class-validator';

@InputType()
export class RedeemPointsInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsUUID()
  rewardId: string;

  @Field(() => Number, { defaultValue: 50 })
  @IsInt()
  @Min(1)
  points: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
