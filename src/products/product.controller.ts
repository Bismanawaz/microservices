import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async all() {
    return this.productService.all();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findProductById(id);
  }

  // @Post('create')
  // @EventPattern('product_created')
  // async create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.createProduct(createProductDto);
  // }
  @EventPattern('product_created')
async create(@Body() createProductDto: CreateProductDto) {
  console.log('Received product_created event:', createProductDto); // Add logging
  return await this.productService.createProduct(createProductDto);
}



  @Post(':id/likes')
  async like(@Param('id') id: number) {
    const product = await this.productService.findProductById(id);

    const updatedLikes: UpdateProductDto = {
      likes: (product.likes || 0) + 1,
    };


    return this.productService.updateProduct(id, updatedLikes);
  }

  // @Put(':id')
  @EventPattern('product_updated')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  //@Delete(':id')
  @EventPattern('product_deleted')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
