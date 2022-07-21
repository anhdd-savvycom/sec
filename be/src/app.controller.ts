import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post()
  async subscription(@Body() publishDto: any) {
    await pubSub.publish('subcribe', { subcribe: {email: 'abc123'} });
    return 'ok'
  }
}
