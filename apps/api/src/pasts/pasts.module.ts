import { Module } from '@nestjs/common';
import { PastsService } from './pasts.service';
import { PastsController } from './pasts.controller';

@Module({
  controllers: [PastsController],
  providers: [PastsService],
})
export class PastsModule {}
