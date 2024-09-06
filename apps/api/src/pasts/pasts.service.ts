import { Injectable } from '@nestjs/common';
import { CreatePastDto } from './dto/create-past.dto';
import { UpdatePastDto } from './dto/update-past.dto';

@Injectable()
export class PastsService {
  create(createPastDto: CreatePastDto) {
    return 'This action adds a new past';
  }

  findAll() {
    return `This action returns all pasts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} past`;
  }

  update(id: number, updatePastDto: UpdatePastDto) {
    return `This action updates a #${id} past`;
  }

  remove(id: number) {
    return `This action removes a #${id} past`;
  }
}
