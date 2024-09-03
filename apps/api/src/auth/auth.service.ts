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
import { compareHashes, hashPassword } from 'src/lib/utils';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async signIn(FindUserDto: FindUserDto, response: Response) {
    try {
      const user = await this.usersService.findOne(FindUserDto);
      if (!user) {
        throw new NotFoundException(
          'This email address not associated with any user.',
        );
      }
      const isPasswordCorrect = await compareHashes(
        FindUserDto.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('You enetred wrong password.');
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
        throw new ServiceUnavailableException("Couldn't autherize user");
      }
    } catch (error) {
      throw error;
    }
  }
  async signUp(createAuthDto: CreateAuthDto) {
    return this.usersService.create(createAuthDto);
  }
  async verify(request: Request) {
    try {
      const auth_token = request.cookies.pastenest_access_token;
      const user = await this.jwtService.verify(auth_token, {});
      return { valid: true, ...user };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('User unauthorized');
    }
  }
}
