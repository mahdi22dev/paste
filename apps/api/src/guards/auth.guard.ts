// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const Roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const url = request.url;

    // if (!Roles) {
    //   console.log('no roles required');
    //   return true;
    // }
    // console.log(Roles);
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;

    //  check matched roles with prisma +by matching roles and sers using function with matchroles() name
    return true;
  }
}
