import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { Auth, NATS_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  //PASO NRO 1
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token not found');
    }
    try {
      //PASO NRO 2
      const { user, token: newToken } = await firstValueFrom(
        this.client.send(Auth.AUTH_VERIFY_USER, token),
      );

      request['user'] = user;
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// NOTA IMPORTANTE: para implementar el JWTStrategy como le he implementado en las API comunes,
// solo tendria que crear el metodo en el microservice de auth para buscar un user por id
// y recibir la respuesta del microservicio parecidos a los pasos 1 y 2
