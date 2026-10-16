import { Module } from '@nestjs/common';

import { ComunModule } from '../comun/comun.module.js';
import { BaseDatosModule } from '../../base-datos/base-datos.module.js';
import { DesarrolloController } from './desarrollo.controller.js';
import { DesarrolloService } from './desarrollo.service.js';
import { DesarrolloRepository } from './desarrollo.repository.js';

@Module({
  imports: [ComunModule, BaseDatosModule],
  controllers: [DesarrolloController],
  providers: [DesarrolloService, DesarrolloRepository],
})
export class DesarrolloModule {}
