import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping')
  getPing(): object {
    return this.appService.getPing();
  }

  @Get('quotes/random')
  @Redirect('http://localhost:3000/api/quotes/random', 301)
  getQuotesForFront() { }

}
