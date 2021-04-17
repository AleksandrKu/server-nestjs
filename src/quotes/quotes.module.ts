import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';

import { Quote } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [TypeOrmModule.forFeature([Quote])]
})
export class QuotesModule { }
