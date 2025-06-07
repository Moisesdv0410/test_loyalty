// src/logs/logs.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogSchema } from './schemas/log.schema';
import { LogsService } from './logs.service';
import { LogsResolver } from './logs.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  providers: [LogsService, LogsResolver],
  exports: [LogsService], // para usarlo en PointsService
})
export class LogsModule {}
