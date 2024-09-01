import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthDtoSchema } from './dto/create-auth.dto';
import { ZodValidationPipe } from 'src/lib/pipes/pipes';
import { FindUserDto, FindUserSchema } from 'src/users/dto/find-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('signin')
  async signIn(
    @Body(new ZodValidationPipe(FindUserSchema))
    FindUserDto: FindUserDto,
  ) {
    return this.authService.signIn(FindUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Body(new ZodValidationPipe(CreateAuthDtoSchema))
    createAuthDto: CreateAuthDto,
  ) {
    return this.authService.signUp(createAuthDto);
  }
}
