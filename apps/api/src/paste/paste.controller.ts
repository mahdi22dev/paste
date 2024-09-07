import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PasteService } from './paste.service';
import { CreatePasteDto, CreatePasteSchema } from './dto/create-paste.dto';
import { ZodValidationPipe } from 'src/lib/pipes/pipes';
import { RolesGuard } from 'src/guards/Roles/roles.guard';
import { Roles } from 'src/guards/Roles/roles.decorator';
import { Role } from 'src/guards/Roles/roles.enum';
import { Request } from 'express';

@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Roles(Role.Guest) // Allow Guests and Admins
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePasteSchema))
    createPasteDto: CreatePasteDto,
    @Req() request: Request,
  ) {
    return this.pasteService.create(createPasteDto, request);
  }

  @Get()
  findAll() {
    return this.pasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasteService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePasteDto: UpdatePasteDto) {
  //   return this.pasteService.update(+id, updatePasteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasteService.remove(+id);
  }
}
