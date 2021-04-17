import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';

@Controller('api/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  insert(@Body() quote: CreateQuoteDto) {
    return this.quotesService.insert(quote);
  }

  @Get('create-db')
  createDb(): Promise<string> {
    return this.quotesService.createDb();
  }

  @Get()
  findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }

  @Get('random')
  findRandom(@Query('tag') tag: string) {
    return this.quotesService.findRandom(tag);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuote: UpdateQuoteDto) {
    return this.quotesService.update(+id, updateQuote);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
