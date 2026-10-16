import { Injectable } from '@nestjs/common';

import { SistemasRepository } from './sistemas.repository.js';
import type { FiltrosKpi } from '../comun/filtros-kpi.js';

const META_SOPORTE = 83.33;
const META_DISPONIBILIDAD = 95;
const HORAS_JORNADA_LABORAL = 8.5;
@Injectable()
export class SistemasService {
  constructor(private readonly repositorio: SistemasRepository) {}

  async soporte(filtros: FiltrosKpi) {
    const fila = await this.repositorio.contarSolicitudesSoporte(filtros);
    const resultado =
      fila.recibidas === 0 ? null : (fila.atendidas / fila.recibidas) * 100;
    let estado: 'cumple' | 'no_cumple' | 'sin_datos' = 'sin_datos';
    if (resultado !== null) {
      estado = resultado >= META_SOPORTE ? 'cumple' : 'no_cumple';
    }

    return {
      id: 'soporte-funcional',
      nombre: 'Atención Soporte Funcional',
      resultado: resultado === null ? null : Math.round(resultado * 100) / 100,
      meta: META_SOPORTE,
      operador: '>=',
      unidad: ' %',
      estado,
      detalle: { atendidos: fila.atendidas, recibidos: fila.recibidas },
    };
  }
  async disponibilidad(filtros: FiltrosKpi) {
    const fila =
      await this.repositorio.disponibilidadServicioscriticos(filtros);
    const dias =
      Math.round(
        (new Date(filtros.hasta).getTime() -
          new Date(filtros.desde).getTime()) /
          864000,
      ) + 1;
    const horasfuncionamiento = dias * HORAS_JORNADA_LABORAL;
    const resultado =
      fila.horasfuncionamiento === 0
        ? null
        : ((horasfuncionamiento - fila.horasindisponibilidad) /
            horasfuncionamiento) *
          100;
    let estado: 'cumple' | 'no_cumple' | 'sin_datos' = 'sin_datos';
    if (resultado !== null) {
      estado = resultado >= META_DISPONIBILIDAD ? 'cumple' : 'no_cumple';
    }

    return {
      id: 'disponibilidad-servicioscriticos',
      nombre: 'Disponibilidad de Servicios críticos',
      resultado: resultado === null ? null : Math.round(resultado * 100) / 100,
      meta: META_DISPONIBILIDAD,
      operador: '>=',
      unidad: ' %',
      estado,
      detalle: {
        horasindisponibilidad: fila.horasindisponibilidad,
        horasfuncionamiento: fila.horasfuncionamiento,
      },
    };
  }
}
