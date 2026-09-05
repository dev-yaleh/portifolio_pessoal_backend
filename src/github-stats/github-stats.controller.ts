import { Controller, Get } from '@nestjs/common';
import { GithubStatsService } from './github-stats.service';

@Controller('github-stats')
export class GithubStatsController {
  constructor(private readonly service: GithubStatsService) {}

  @Get()
  getStats() {
    return this.service.getStats();
  }
}