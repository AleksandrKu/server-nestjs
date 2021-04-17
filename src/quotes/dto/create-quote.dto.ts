import { IsOptional } from 'class-validator';

export class CreateQuoteDto {

  @IsOptional()
  id: number; // Unique identifier of quote.

  author: string; // Author of a quote.
  text: string; // Quote text.

  @IsOptional()
  source: string; // optional link/source of quote.

  @IsOptional()
  tags: string[]; // optional list of tags related to quote.

  @IsOptional()
  createdBy: string; // app’s user who initiate creation of quote.

  @IsOptional()
  createdAt: string; // timestamp of quote creation.

  @IsOptional()
  updatedAt: string; // timestamp of quote update.


  @IsOptional()
  isDeleted: boolean; // status of deletion (soft delete).
}
