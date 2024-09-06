import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PastsService } from './pasts.service';
import { CreatePastDto } from './dto/create-past.dto';
import { UpdatePastDto } from './dto/update-past.dto';

@Controller('pasts')
export class PastsController {
  constructor(private readonly pastsService: PastsService) {}

  @Post()
  create(@Body() createPastDto: CreatePastDto) {
    return this.pastsService.create(createPastDto);
  }

  @Get()
  findAll() {
    return this.pastsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pastsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePastDto: UpdatePastDto) {
    return this.pastsService.update(+id, updatePastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastsService.remove(+id);
  }
}
