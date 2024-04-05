import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Microservices, PaginationDto, ProductTCP } from '../common';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(Microservices.PRODUCT_SERVICE)
    private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send(ProductTCP.CREATE, createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productClient.send(ProductTCP.FIND_ALL, paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send(ProductTCP.FIND_ONE, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productClient
      .send(ProductTCP.UPDATE, {
        id,
        ...updateProductDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send(ProductTCP.DELETE, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
