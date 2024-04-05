import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from '../common';
import { envs } from '../config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: Microservices.PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMsHost,
          port: envs.productMsPort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
