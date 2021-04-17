import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Quote } from '../quotes/entities/quote.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: '123',
        database: 'nestjs',
        entities: [Quote],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule { }