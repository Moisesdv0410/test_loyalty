import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions.entity';
import { TransactionType } from './enums/transaction-type.enum';
import { GcpService } from '../gcp/gcp.service';

interface CreateTxDto {
  user_id: string;
  type: TransactionType;
  points: number;
  amount?: number;
  reward_id?: string;
  description?: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,

    private readonly gcpService: GcpService,
  ) {}

  async createTransaction(data: CreateTxDto): Promise<Transaction> {
    const tx = this.transactionRepo.create(data);
    const savedTx = await this.transactionRepo.save(tx);

    // ejemplo de solo notificar si es una transacción de acumulación (EARN)
    if (data.type === TransactionType.EARN) {
      await this.gcpService.notifyPurchase({
        userId: data.user_id,
        points: data.points,
      });
    }

    return savedTx;
  }

  async getUserPoints(userId: string): Promise<number> {
    const result = await this.transactionRepo
      .createQueryBuilder('t')
      .select('SUM(t.points)', 'sum')
      .where('t.user_id = :userId', { userId })
      .getRawOne<{ sum: string | null }>();

    return Number(result?.sum) || 0;
  }

  async getUserHistory(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { user_id: userId },
      order: { date: 'DESC' },
    });
  }
}
