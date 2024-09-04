import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { compareHashes } from 'src/lib/utils';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(FindUserDto: FindUserDto, response: Response, request: Request) {
    try {
      // check bots
      const bot = await this.validateCaptcha(request);
      if (!bot) {
        throw new ServiceUnavailableException("Couldn't complete the request");
      }

      // get user fromdb
      const user = await this.usersService.findOne(FindUserDto);
      if (!user) {
        throw new NotFoundException(
          'This email address not associated with any user.',
        );
      }

      // check passwords
      const isPasswordCorrect = await compareHashes(
        FindUserDto.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('You enetred wrong password.');
      }

      // jwt
      const payload = { id: user.id, user: user.username, email: user.email };
      const token = {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
        }),
      };

      // send token
      if (token.access_token) {
        response.cookie('pastenest_access_token', token.access_token);
        return token;
      } else {
        throw new ServiceUnavailableException("Couldn't autherize user");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async validateCaptcha(request: Request) {
    try {
      const recaptchaToken = request.header('X-Recaptcha-Token');
      const secretKey = process.env.CAPTCHA_SECRET_KEY;
      const capatchaValidation = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
        {
          method: 'POST',
        },
      );

      const bot = (await capatchaValidation.json()) as {
        success: boolean;
        score: number;
        hostname: string;
      };
      return recaptchaToken && bot.success && bot.score > 0.5;
    } catch (error) {
      return false;
    }
  }

  async signUp(createAuthDto: CreateAuthDto, response: Response) {
    const user = await this.usersService.create(createAuthDto);
    if (!user) {
      throw new ServiceUnavailableException("Couldn't create the user");
    }
    const payload = { id: user.id, user: user.username, email: user.email };
    const token = {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
    if (token.access_token) {
      response.cookie('pastenest_access_token', token.access_token);
      return token;
    } else {
      throw new ServiceUnavailableException("Couldn't autherize the user");
    }
  }

  async verify(request: Request) {
    try {
      const auth_token = request.cookies.pastenest_access_token;
      const user = await this.jwtService.verify(auth_token, {});
      return user;
    } catch (error) {
      throw new UnauthorizedException('User unauthorized');
    }
  }
  async logOut(response: Response) {
    try {
      response.clearCookie('pastenest_access_token');
    } catch (error) {
      throw new UnauthorizedException("Couldn't complete the action");
    }
  }
}
