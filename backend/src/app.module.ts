import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { DesarrolloModule } from './indicadores/desarrollo/desarrollo.module.js';
import { SistemasModule } from './indicadores/sistemas/sistemas.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DesarrolloModule,
    SistemasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
