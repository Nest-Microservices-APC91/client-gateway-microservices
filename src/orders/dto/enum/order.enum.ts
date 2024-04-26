export enum OrderStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
}

export const OrdersStatusList = [
  OrderStatus.PENDING,
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
  OrderStatus.PAID,
];
