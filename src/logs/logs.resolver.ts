import { Resolver, Query } from '@nestjs/graphql';
import { LogsService } from './logs.service';
import { Log } from './logs.model';

@Resolver(() => Log)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [Log])
  async logs(): Promise<Log[]> {
    return this.logsService.findAll();
  }
}
