import { IsString, IsNumber, IsOptional, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
