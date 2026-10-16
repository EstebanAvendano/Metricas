import { Injectable } from '@nestjs/common';

import { DesarrolloRepository } from './desarrollo.repository.js';
import type { FiltrosKpi } from '../comun/filtros-kpi.js';

const META_SATISFACCION = 4;

const META_FALLAS = 15;

@Injectable()
export class DesarrolloService {
  constructor(private readonly repositorio: DesarrolloRepository) {}

  async satisfaccion(filtros: FiltrosKpi) {
    const fila = await this.repositorio.sumarCalificaciones(filtros);
    const resultado =
      fila.calificaciones === 0
        ? null
        : fila.sumaPuntajes / fila.calificaciones;
    let estado: 'cumple' | 'no_cumple' | 'sin_datos' = 'sin_datos';
    if (resultado !== null) {
      estado = resultado >= META_SATISFACCION ? 'cumple' : 'no_cumple';
    }

    return {
      id: 'satisfaccion',
      nombre: 'Satisfacción cliente interno',
      resultado: resultado === null ? null : Math.round(resultado * 100) / 100,
      meta: META_SATISFACCION,
      operador: '>=',
      unidad: ' / 5',
      estado,
      detalle: { calificaciones: fila.calificaciones },
    };
  }
  async resolucionFallas(filtros: FiltrosKpi) {
    const fila = await this.repositorio.contarFallas(filtros);
    const resultado =
      fila.ticketsTotales === 0
        ? null
        : (fila.ticketsFallas / fila.ticketsTotales) * 100;
    let estado: 'cumple' | 'no_cumple' | 'sin_datos' = 'sin_datos';
    if (resultado !== null) {
      estado = resultado < META_FALLAS ? 'cumple' : 'no_cumple';
    }

    return {
      id: 'resolucion-fallas',
      nombre: 'Resolución de Fallas',
      resultado: resultado === null ? null : Math.round(resultado * 100) / 100,
      meta: META_FALLAS,
      operador: '<',
      unidad: '%',
      estado,
      detalle: {
        ticketsFallas: fila.ticketsFallas,
        ticketsTotales: fila.ticketsTotales,
      },
    };
  }
}
