import { IsString, IsNumber, IsOptional, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  likes?: number; // Allow optional likes for updates
}
