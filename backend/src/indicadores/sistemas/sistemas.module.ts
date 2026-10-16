import { Module } from '@nestjs/common';
import { SistemasController } from './sistemas.controller.js';
import { SistemasService } from './sistemas.service.js';
import { SistemasRepository } from './sistemas.repository.js';
import { ComunModule } from '../comun/comun.module.js';
import { BaseDatosModule } from '../../base-datos/base-datos.module.js';

@Module({
  controllers: [SistemasController],
  providers: [SistemasService, SistemasRepository],
  imports: [ComunModule, BaseDatosModule],
})
export class SistemasModule {}
