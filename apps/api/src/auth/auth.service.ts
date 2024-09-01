import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { compareHashes, hashPassword } from 'src/lib/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async signIn(FindUserDto: FindUserDto) {
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
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
        }),
      };
    } catch (error) {
      throw error;
    }
  }
  async signUp(createAuthDto: CreateAuthDto) {
    return this.usersService.create(createAuthDto);
  }
}
