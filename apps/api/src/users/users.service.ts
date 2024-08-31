import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    // throw new Error('random error');
    return {
      message: 'user created',
      data: {
        ...createUserDto,
      },
    };
  }

  findAll() {
    return {
      user: 'Mahdi idrissi',
      age: 24,
      hobbie: null,
    };
  }

  findOne(id: number) {
    console.log(typeof id);
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
