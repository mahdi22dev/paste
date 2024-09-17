import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePasteDto } from './dto/create-paste.dto';
import { PrismaService } from 'src/prisma.service';
import { Mode } from '@prisma/client';
import { compareHashes, hashPassword } from 'src/lib/utils';
import { Request } from 'express';
import * as shortid from 'shortid';

@Injectable()
export class PasteService {
  constructor(private prisma: PrismaService) {}

  async create(createPasteDto: CreatePasteDto, request: Request) {
    try {
      // check v3 captcha
      // const bot = await this.validateCaptcha(createPasteDto);
      // console.log(bot);

      // if (!bot) {
      //   throw new ServiceUnavailableException("Couldn't complete the request");
      // }

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

      return await this.prisma.paste.create({
        data: {
          pasteId: shortid.generate(),
          authorId: user?.id || null,
          title: createPasteDto.title,
          content: createPasteDto.content,
          mode: Mode[createPasteDto.mode.toUpperCase()],
          experation: createPasteDto.date?.toString(),
          syntax: createPasteDto.syntax,
          password:
            (createPasteDto.password &&
              (await hashPassword(createPasteDto.password))) ||
            null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, password: string) {
    try {
      const paste = await this.prisma.paste.findUnique({
        where: { pasteId: id },
      });
      if (!paste) {
        throw new NotFoundException('Requested resources not found');
      }

      if (paste?.mode == 'PASSWORD' && !password) {
        return { mode: paste.mode, unlocked: false };
      }

      if (password && paste?.password) {
        const correctPassword = await compareHashes(password, paste?.password);
        return correctPassword
          ? { ...paste, unlocked: true }
          : { mode: paste.mode, unlocked: false, error: 'incorrect password' };
      }

      return paste;
    } catch (error) {
      throw error;
    }
  }
  async validateCaptcha(createPasteDto: CreatePasteDto) {
    try {
      const secretKey = process.env.CAPTCHA_BOX_SECRET_KEY;
      const capatchaValidation = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${createPasteDto.recaptchaToken}`,
        {
          method: 'POST',
        },
      );

      const bot = (await capatchaValidation.json()) as {
        success: boolean;
        score: number;
        hostname: string;
      };
      console.log(bot);

      return createPasteDto.recaptchaToken && bot.success;
    } catch (error) {
      return false;
    }
  }
}
