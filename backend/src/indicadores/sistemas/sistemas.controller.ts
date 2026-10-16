import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SistemasService } from './sistemas.service.js';
import { FiltrosKpi } from '../comun/filtros-kpi.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiFiltrosKpi } from '../comun/api-filtros-kpi.decorator.js';
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

@ApiTags('Indicadores · Sistemas')
@Controller('indicadores/sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @ApiOperation({
    summary: 'Ateción de Soporte Funcional',
    description:
      'Contabilizar los requerimientos de soporte recibidos. Meta: ≥ 83.33%.',
  })
  @ApiFiltrosKpi()
  @Get('soporte')
  soporte(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('usuario') usuario?: string,
  ) {
    return this.sistemasService.soporte(
      this.validarFiltros(desde, hasta, usuario),
    );
  }

  @ApiOperation({
    summary: 'Disponibilidad de servicios críticos',
    description:
      'Medir el correcto funcionamiento por horas laborales. Meta: >= 95% .',
  })
  @ApiFiltrosKpi()
  @Get('dispo-servicios-criticos')
  disponibilidad(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('usuario') usuario?: string,
  ) {
    return this.sistemasService.disponibilidad(
      this.validarFiltros(desde, hasta, usuario),
    );
  }

  private validarFiltros(
    desde?: string,
    hasta?: string,
    usuario?: string,
  ): FiltrosKpi {
    if (
      !desde ||
      !hasta ||
      !FORMATO_FECHA.test(desde) ||
      !FORMATO_FECHA.test(hasta)
    ) {
      throw new BadRequestException(
        'Los parámetros "desde" y "hasta" son obligatorios, con formato AAAA-MM-DD.',
      );
    }
    if (usuario !== undefined && !Number.isInteger(Number(usuario))) {
      throw new BadRequestException(
        'El parámetro "usuario" debe ser un número.',
      );
    }

    return {
      desde,
      hasta,
      usuario: usuario === undefined ? undefined : Number(usuario),
    };
  }
}
