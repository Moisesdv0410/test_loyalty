import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { RegisterPurchaseInput } from './dto/register-purchase.input';
import { RedeemPointsInput } from './dto/redeem-points.input';
import { Transaction } from '../transactions/entities/transactions.entity';
import { TransactionType } from '../transactions/enums/transaction-type.enum';
import { UsersService } from '../users/users.service';
import { GcpService } from '../gcp/gcp.service';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class PointsService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly gcpService: GcpService,
    private readonly logsService: LogsService,
  ) {}

  /* ---------- Register Purchase ---------- */
  async registerPurchase(input: RegisterPurchaseInput): Promise<Transaction> {
    const user = await this.usersService.findById(input.userId);
    if (!user) throw new NotFoundException('User not found');

    const earnedPoints = Math.floor(input.amount);

    const transaction = await this.transactionsService.createTransaction({
      user_id: input.userId,
      type: TransactionType.EARN,
      points: earnedPoints,
      amount: input.amount,
      description: `Compra registrada por $${input.amount}`,
    });

    // Notifica Cloud Function
    await this.gcpService.notifyPurchase({
      userId: input.userId,
      points: earnedPoints,
    });

    // Log INFO
    await this.logsService.create(
      'PointsService.registerPurchase', // action
      'INFO', // level
      'Compra registrada y puntos asignados',
      {
        userId: input.userId,
        points: earnedPoints,
        amount: input.amount,
      },
    );

    return transaction;
  }

  /* ---------- Redeem Points ---------- */
  async redeemPoints(input: RedeemPointsInput): Promise<Transaction> {
    const user = await this.usersService.findById(input.userId);
    if (!user) throw new NotFoundException('User not found');

    const availablePoints = await this.transactionsService.getUserPoints(
      input.userId,
    );

    if (input.points > availablePoints) {
      // Log WARN
      await this.logsService.create(
        'PointsService.redeemPoints',
        'WARN',
        'Intento de redención con puntos insuficientes',
        {
          userId: input.userId,
          attemptedPoints: input.points,
          availablePoints,
        },
      );

      throw new BadRequestException('Insufficient points');
    }

    const transaction = await this.transactionsService.createTransaction({
      user_id: input.userId,
      type: TransactionType.REDEEM,
      points: -input.points,
      reward_id: input.rewardId,
      description: input.description || 'Puntos redimidos',
    });
    /*
    // Log INFO de éxito
    await this.logsService.create(
      'PointsService.redeemPoints',
      'INFO',
      'Puntos redimidos correctamente',
      {
        userId: input.userId,
        points: input.points,
        rewardId: input.rewardId,
      },
    );
    */
    // Log INFO de advertencia
    await this.logsService.create(
      'REDEEM_ATTEMPT',
      'WARN',
      'Intento de redención de puntos',
      {
        userId: input.userId,
        points: input.points,
        rewardId: input.rewardId,
      },
      'PointsService.redeemPoints',
    );

    return transaction;
  }
}
