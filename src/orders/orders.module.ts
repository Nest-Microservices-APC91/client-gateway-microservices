import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersController } from './orders.controller';
import { Microservices } from '../common';
import { envs } from '../config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: Microservices.ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMsHost,
          port: envs.orderMsPort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
