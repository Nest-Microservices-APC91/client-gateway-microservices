export const NATS_SERVICE = 'NATS_SERVICE';

export enum Products {
  CREATE = 'CREATE_PRODUCT',
  FIND_ALL = 'FIND_ALL_PRODUCTS',
  FIND_ONE = 'FIND_ONE_PRODUCT',
  UPDATE = 'UPDATE_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
}

export enum Orders {
  CREATE = 'CREATE_ORDER',
  FIND_ALL = 'FIND_ALL_ORDERS',
  FIND_ALL_BY_STATUS = 'FIND_ALL_ORDERS_BY_STATUS',
  FIND_ONE = 'FIND_ONE_ORDER',
  CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS',
}

export enum Auth {
  AUTH_REGISTER_USER = 'AUTH_REGISTER_USER',
  AUTH_LOGIN_USER = 'AUTH_LOGIN_USER',
  AUTH_VERIFY_USER = 'AUTH_VERIFY_USER',
}
