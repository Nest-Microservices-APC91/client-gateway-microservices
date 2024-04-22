export enum OrderStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export const OrdersStatusList = [
  OrderStatus.PENDING,
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
];
