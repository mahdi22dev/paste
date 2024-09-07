import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePasteDto } from './dto/create-paste.dto';
import { PrismaService } from 'src/prisma.service';
import { Mode } from '@prisma/client';
import { hashPassword } from 'src/lib/utils';
import { Request } from 'express';

@Injectable()
export class PasteService {
  constructor(private prisma: PrismaService) {}
  async create(createPasteDto: CreatePasteDto, request: Request) {
    try {
      // check experation date
      const user = request.user as {
        id: number;
      };
      const currentdate = new Date();
      if (createPasteDto?.date) {
        const pasteDate = new Date(createPasteDto.date);
        if (pasteDate < currentdate) {
          createPasteDto.date = null;
        }
      }

      // check if content is empty
      if (createPasteDto.content === '') {
        throw new BadRequestException("paste content can't be empty");
      }

      // check v3 captcha
      const bot = true;
      if (!bot) {
        throw new ServiceUnavailableException("Couldn't complete the request");
      }

      try {
        return await this.prisma.paste.create({
          data: {
            authorId: user?.id || null,
            title: createPasteDto.title,
            content: createPasteDto.content,
            mode: Mode[createPasteDto.mode.toUpperCase()],
            experation: createPasteDto.date?.toString(),
            password:
              (createPasteDto.password &&
                (await hashPassword(createPasteDto.password))) ||
              null,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all paste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paste`;
  }

  // update(id: number, updatePasteDto: UpdatePasteDto) {
  //   return `This action updates a #${id} paste`;
  // }

  remove(id: number) {
    return `This action removes a #${id} paste`;
  }
}
