import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body: CreateUserDto = req.body;
    console.log('Request...');
    console.log(body.email);
    next();
  }
}
