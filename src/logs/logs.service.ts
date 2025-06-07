// src/logs/logs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Log } from './logs.model';
import { LogDocument } from './schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel('Log') private readonly logModel: Model<LogDocument>,
  ) {}

  async create(
    action: string,
    level: 'INFO' | 'WARN' | 'ERROR',
    message: string,
    metadata?: Record<string, any>,
    context?: string, // opcional
  ): Promise<Log> {
    const doc = await this.logModel.create({
      action,
      level,
      message,
      metadata,
      context,
    });
    return this.toGraphQL(doc);
  }

  async findAll(): Promise<Log[]> {
    const docs = await this.logModel
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return docs.map(this.toGraphQL);
  }

  private toGraphQL = (doc: LogDocument): Log => ({
    _id: doc._id.toString(),
    action: doc.action,
    level: doc.level,
    message: doc.message,
    context: doc.context,
    metadata: doc.metadata,
    createdAt: doc.createdAt,
  });
}
