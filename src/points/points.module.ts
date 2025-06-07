// src/points/points.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsResolver } from './points.resolver';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { GcpModule } from '../gcp/gcp.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    forwardRef(() => TransactionsModule),
    forwardRef(() => UsersModule),
    GcpModule,
    LogsModule,
  ],
  providers: [PointsService, PointsResolver],
  exports: [PointsService],
})
export class PointsModule {}
