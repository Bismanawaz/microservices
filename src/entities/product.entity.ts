import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  @IsOptional()
  stockQuantity: number;

  @Column({ default: 'default-image-url.jpg' })
  image: string;

  @Column({ nullable: true })
  title: string;

  @Column({ default: 0 })  // Default value for likes
  likes: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
