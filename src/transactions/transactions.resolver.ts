import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PointsService } from '../points/points.service';
import { TransactionsService } from './transactions.service';
import { TransactionDTO } from './dto/transaction.dto';
import { RegisterPurchaseInput } from '../points/dto/register-purchase.input';
import { RedeemPointsInput } from '../points/dto/redeem-points.input';

@Resolver(() => TransactionDTO)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly pointsService: PointsService,
  ) {}

  @Mutation(() => TransactionDTO)
  async registerPurchase(
    @Args('input') input: RegisterPurchaseInput,
  ): Promise<TransactionDTO> {
    const transaction = await this.pointsService.registerPurchase(input);

    return {
      ...transaction,
      userId: transaction.user_id,
      rewardId: transaction.reward_id ?? undefined,
    };
  }

  @Mutation(() => TransactionDTO)
  async redeemPoints(
    @Args('input') input: RedeemPointsInput,
  ): Promise<TransactionDTO> {
    const transaction = await this.pointsService.redeemPoints(input);

    return {
      ...transaction,
      userId: transaction.user_id,
      rewardId: transaction.reward_id ?? undefined,
    };
  }

  @Query(() => Number)
  async getUserPoints(@Args('userId') userId: string): Promise<number> {
    return this.transactionsService.getUserPoints(userId);
  }

  @Query(() => [TransactionDTO])
  async getUserHistory(
    @Args('userId') userId: string,
  ): Promise<TransactionDTO[]> {
    const transactions = await this.transactionsService.getUserHistory(userId);

    return transactions.map((tx) => ({
      ...tx,
      userId: tx.user_id,
      rewardId: tx.reward_id ?? undefined,
    }));
  }
}
