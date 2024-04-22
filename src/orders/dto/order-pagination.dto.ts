import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common';
import { OrdersStatusList, OrderStatus } from './enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Valid status are ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
