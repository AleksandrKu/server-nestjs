import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string; // Author of a quote.

  @Column()
  text: string; // Quote text.

  @Column({ nullable: true })
  source: string; // optional link/source of quote.

  @Column("text", { nullable: true, array: true })
  tags: string[]; // optional list of tags related to quote.

  @Column({ nullable: true })
  createdBy: string; // app’s user who initiate creation of quote.

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // timestamp of quote creation.

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date; // timestamp of quote update.

  @Column({ default: false })
  isDeleted: boolean; // status of deletion (soft delete).
}
