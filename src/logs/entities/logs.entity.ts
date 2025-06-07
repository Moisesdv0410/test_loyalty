import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Log {
  @Field()
  @Prop({ required: true })
  level: string;

  @Field()
  @Prop({ required: true })
  message: string;

  @Field()
  @Prop()
  context?: string;

  @Field(() => String)
  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
