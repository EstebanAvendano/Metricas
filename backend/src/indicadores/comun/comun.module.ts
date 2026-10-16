import { Module } from '@nestjs/common';
import { ExclusionEstandarService } from './exclusion-estandar.service.js';

@Module({
  providers: [ExclusionEstandarService],
  exports: [ExclusionEstandarService],
})
export class ComunModule {}
