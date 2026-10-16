import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { DesarrolloService } from './desarrollo.service.js';
import { FiltrosKpi } from '../comun/filtros-kpi.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiFiltrosKpi } from '../comun/api-filtros-kpi.decorator.js';
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

@ApiTags('Indicadores · Desarrollo')
@Controller('indicadores/desarrollo')
export class DesarrolloController {
  constructor(private readonly desarrolloService: DesarrolloService) {}

  @ApiOperation({
    summary: 'Satisfacción del cliente interno',
    description:
      'Promedio de las calificaciones de solución (1 a 5). Meta: ≥ 4,0.',
  })
  @ApiFiltrosKpi()
  @Get('satisfaccion')
  satisfaccion(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('usuario') usuario?: string,
  ) {
    return this.desarrolloService.satisfaccion(
      this.validarFiltros(desde, hasta, usuario),
    );
  }

  @ApiOperation({
    summary: 'Resolución de fallas',
    description:
      "Porcentaje de tickets con etiqueta 'Caso de Soporte' sobre los tikcets totales . Meta: <15% .",
  })
  @ApiFiltrosKpi()
  @Get('resolucion-fallas')
  resolucionFallas(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('usuario') usuario?: string,
  ) {
    return this.desarrolloService.resolucionFallas(
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
