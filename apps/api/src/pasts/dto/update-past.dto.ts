import { PartialType } from '@nestjs/mapped-types';
import { CreatePastDto } from './create-past.dto';

export class UpdatePastDto extends PartialType(CreatePastDto) {}
