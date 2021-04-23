import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Quote } from './entities/quote.entity';
const TABLE_QOUTE = 'quote';

const fsPromises = fs.promises;
const pathToBaseQuotes = path.join(__dirname, '..', '..', 'quotes', 'database', 'quotes-base.json');

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private quoteRepository: Repository<Quote>) { }

  async insert(quote: CreateQuoteDto) {
    return await this.quoteRepository.insert(quote)
  }

  async createDb(): Promise<string> {
    if (!(await fsPromises.stat(pathToBaseQuotes))) return 'No file quotes-base.json';
    const quotesString = await fsPromises.readFile(pathToBaseQuotes, 'utf8');
    const quotes = JSON.parse(quotesString);
    if (!Array.isArray(quotes)) return 'Bad data in quotes-base.json';
    quotes.forEach(async (item: any) => {
      item.tags = item.tags ? item.tags.split(',') : [item.tags];
      await this.insert(item)
    });
    return 'Success. Create Database';
  }

  async findAll(): Promise<Quote[]> {
    return await this.quoteRepository.find({ where: { isDeleted: false } })
  }

  async findRandom(tag: string): Promise<Quote> {
    let query = `SELECT id FROM ${TABLE_QOUTE} WHERE "isDeleted" is False`;
    if (tag) query += ` AND ( text LIKE '%${tag}%' OR '${tag}' = ANY (tags) )`;
    const idsObject = await this.quoteRepository.query(query);
    const ids = idsObject.map(item => item.id);
    const id = ids[Math.floor(Math.random() * ids.length)];
    const quote = await this.findOne(id);
    if (!quote) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return quote;
  }

  async findOne(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id: id, isDeleted: false } });
    if (!quote) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return quote;
  }

  async update(id: number, updateQuote: UpdateQuoteDto) {
    const quote = await this.quoteRepository.findOne(id);
    if (!quote) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    Object.entries(updateQuote).forEach(([key, value]) => quote[key] = value)
    return await this.quoteRepository.save(quote)
  }

  async remove(id: number) {
    const quote = await this.quoteRepository.findOne({ where: { id: id, isDeleted: false } });
    if (!quote) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    quote.isDeleted = true;
    const result = await this.quoteRepository.save(quote);
    return result ? `Quote with id: ${id} deleted.` : `Can not delete quote id: ${id}.`;
  }
}
