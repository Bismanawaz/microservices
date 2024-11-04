import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
  //   const newProduct = this.productRepository.create(createProductDto);
  //   return await this.productRepository.save(newProduct);
  // }
  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.error('Error creating product:', error); // Log the error
      throw new NotFoundException('Product creation failed');
    }
  }  
  

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find(); // Retrieves all products from the database
  }

  async all(): Promise<ProductEntity[]> {
    return this.findAllProducts(); // Calls findAllProducts to get all products
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findProductById(id);
    Object.assign(product, updateProductDto); // Update only specified fields
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productRepository.remove(product);
  }
}
