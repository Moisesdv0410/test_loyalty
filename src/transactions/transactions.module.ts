import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { PointsModule } from '../points/points.module';
import { GcpModule } from '../gcp/gcp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), PointsModule, GcpModule],
  providers: [TransactionsService, TransactionsResolver],
  exports: [TransactionsService],
})
export class TransactionsModule {}
