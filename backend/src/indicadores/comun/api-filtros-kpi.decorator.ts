import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

// Describe en Swagger los filtros que comparten todos los indicadores.
export function ApiFiltrosKpi() {
  return applyDecorators(
    ApiQuery({
      name: 'desde',
      required: true,
      description: 'Fecha inicial, incluida (AAAA-MM-DD).',
      example: '2026-09-01',
    }),
    ApiQuery({
      name: 'hasta',
      required: true,
      description: 'Fecha final, incluida (AAAA-MM-DD).',
      example: '2026-09-30',
    }),
    ApiQuery({
      name: 'usuario',
      required: false,
      type: Number,
      description:
        'Id del usuario resolutor. Si no se envía, se calcula para todo el equipo.',
    }),
  );
}
