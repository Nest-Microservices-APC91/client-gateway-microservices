/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;

}

const envsSchema = joi.object({
  PORT: joi.number().required().error(new Error('PORT IS REQUIRED')),
  //ENV Microservices products
  PRODUCTS_MS_HOST: joi.string().required().error(new Error('PRODUCTS_MS_HOST IS REQUIRED')),
  PRODUCTS_MS_PORT: joi.number().required().error(new Error('PRODUCTS_MS_PORT IS REQUIRED')),
  //ENV Microservices orders
  ORDERS_MS_HOST: joi.string().required().error(new Error('ORDERS_MS_HOST IS REQUIRED')),
  ORDERS_MS_PORT: joi.number().required().error(new Error('ORDERS_MS_PORT IS REQUIRED')),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  Logger.error(error.message);
  throw new Error(error.message);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMsHost: envVars.PRODUCTS_MS_HOST,
  productMsPort: envVars.PRODUCTS_MS_PORT,
  ordersMsHost: envVars.ORDERS_MS_HOST,
  orderMsPort: envVars.ORDERS_MS_PORT,
};
