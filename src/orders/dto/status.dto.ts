import { IsEnum } from 'class-validator';
import { OrdersStatusList, OrderStatus } from './enum/order.enum';

export class StatusDto {
  @IsEnum(OrdersStatusList, {
    message: `Valid status are ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
