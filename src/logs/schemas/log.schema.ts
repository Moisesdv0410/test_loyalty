// src/logs/schemas/log.schema.ts
import { Schema, Document, Types } from 'mongoose';

export interface LogDocument extends Document {
  _id: Types.ObjectId;
  action: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  metadata?: Record<string, any>;
  context?: string;
  createdAt: Date;
}

export const LogSchema = new Schema<LogDocument>(
  {
    action: { type: String, required: true },
    level: { type: String, enum: ['INFO', 'WARN', 'ERROR'], required: true },
    message: { type: String, required: true },
    metadata: { type: Object },
    context: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);
