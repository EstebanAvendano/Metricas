import { Module } from '@nestjs/common';
import { BaseDatosService } from './base-datos.service.js';

@Module({
  providers: [BaseDatosService],
  exports: [BaseDatosService],
})
export class BaseDatosModule {}
