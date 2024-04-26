import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { Auth, NATS_SERVICE } from '../common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { JwtToken } from '../common/decorators/jwt-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send(Auth.AUTH_REGISTER_USER, registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send(Auth.AUTH_LOGIN_USER, loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  findOne(@User() user: CurrentUser, @JwtToken() token: string) {
    return {
      user,
      token,
    };
    //return this.client.send(Auth.AUTH_VERIFY_USER, {}).pipe(
    //  catchError((err) => {
    //    throw new RpcException(err);
    //  }),
    //);
  }

  @UseGuards(AuthGuard)
  @Get('protegido')
  protegido() {
    return {
      msg: true,
    };
  }
}
