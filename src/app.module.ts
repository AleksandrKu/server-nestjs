import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    QuotesModule,
    DatabaseModule,
    ConfigModule.forRoot({ envFilePath: '.env' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
