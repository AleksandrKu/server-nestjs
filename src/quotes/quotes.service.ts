import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In, Raw } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Quote } from './entities/quote.entity';

const fsPromises = fs.promises;

const pathToBaseQuotes = path.join(__dirname, 'database', 'quotes-base.json');
const pathToDatabaseQuotes = path.join(__dirname, 'database', 'quotes.json');

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
    return await this.quoteRepository.find()
  }

  async findRandom(tag: string): Promise<Quote> {
    let query = `SELECT id FROM quote `;
    if (tag) query += `WHERE text LIKE '%${tag}%' OR '${tag}' = ANY (tags)`;
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
    const quote = await this.quoteRepository.findOne(id);
    if (!quote) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    quote.isDeleted = true;
    const result = await this.quoteRepository.save(quote)
    return result ? `Quote with id: ${id} deleted.` : `Can not delete quote id: ${id}.`;
  }
}
