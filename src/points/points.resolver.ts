// src/points/points.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PointsService } from './points.service';
import { RegisterPurchaseInput } from './dto/register-purchase.input';
import { RedeemPointsInput } from './dto/redeem-points.input';
import { TransactionDTO } from '../transactions/dto/transaction.dto';
import { Transaction } from '../transactions/entities/transactions.entity';

@Resolver(() => TransactionDTO)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  /* ------------ registerPurchase ---------------- */
  @Mutation(() => TransactionDTO)
  async registerPurchase(
    @Args('input') input: RegisterPurchaseInput,
  ): Promise<TransactionDTO> {
    const tx = await this.pointsService.registerPurchase(input);
    return this.toDTO(tx);
  }

  /* ------------ redeemPoints -------------------- */
  @Mutation(() => TransactionDTO)
  async redeemPoints(
    @Args('input') input: RedeemPointsInput,
  ): Promise<TransactionDTO> {
    const tx = await this.pointsService.redeemPoints(input);
    return this.toDTO(tx);
  }

  /* ------------ helper de mapeo ----------------- */
  private toDTO(tx: Transaction): TransactionDTO {
    return {
      id: tx.id,
      userId: tx.user_id,
      type: tx.type,
      points: tx.points,
      amount: tx.amount,
      rewardId: tx.reward_id ?? undefined,
      date: tx.date,
      description: tx.description ?? undefined,
    };
  }
}
