import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthDtoSchema } from './dto/create-auth.dto';
import { ZodValidationPipe } from 'src/lib/pipes/pipes';
import { FindUserDto, FindUserSchema } from 'src/users/dto/find-user.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { Request, Response } from 'express';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('signin')
  async signIn(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body(new ZodValidationPipe(FindUserSchema))
    FindUserDto: FindUserDto,
  ) {
    // this need to be accessd by authguard and check the token with the secret
    console.log(request.cookies);
    return this.authService.signIn(FindUserDto, response);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Body(new ZodValidationPipe(CreateAuthDtoSchema))
    createAuthDto: CreateAuthDto,
  ) {
    await Promise.all(
      Array.from({ length: 10000 }).map(async () => {
        const now = Date.now();
        const response = await this.authService.signUp(createAuthDto);
        console.log(
          `the request takes ${Date.now() - now} ms to complete for ` +
            response.email,
        );
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }),
    );
    return 'Batch proccessed';
  }
}
