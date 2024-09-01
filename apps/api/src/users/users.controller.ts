import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {}
