import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), 
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE', 
        transport: Transport.RMQ, 
        options: {
          urls: ['amqps://tkgflhea:VFM7htsgTTbqBV_WtTReJzu11H6U7ztD@toad.rmq.cloudamqp.com/tkgflhea'], // RabbitMQ connection URL
          queue: 'main_queue', 
          queueOptions: {
            durable: true, 
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
