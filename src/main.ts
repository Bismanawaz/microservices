import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    // Create an HTTP application
    const app = await NestFactory.create(AppModule);

    // Start the HTTP server
    await app.listen(3001);
    console.log("HTTP server is listening on port 3001");

    // Create a microservice application
    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://tkgflhea:VFM7htsgTTbqBV_WtTReJzu11H6U7ztD@toad.rmq.cloudamqp.com/tkgflhea'],
        queue: 'main_queue',
        queueOptions: {
          durable: true
        },
      },
    });

    // Start the microservice
    await microservice.listen();
    console.log("Microservice is listening");
  } catch (error) {
    console.error("Error during application bootstrap:", error);
  }
}
bootstrap();
