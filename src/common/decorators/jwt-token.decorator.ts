import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const JwtToken = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = req.token;

  if (!token) {
    throw new InternalServerErrorException('token not found');
  }

  return token;
});
