import { Injectable } from '@nestjs/common';

export const ETIQUETAS_BLOQUEADO = [45, 77, 188, 201, 203];

//Sin categorizar,Icebox, Backlog
export const COLUMNAS_NO_PLANIFICADAS = [1, 2, 3];

export type OpcionesExclusion = {
  incluirExcluidos?: boolean;
};

@Injectable()
export class ExclusionEstandarService {
  condicion(opciones: OpcionesExclusion = {}): string {
    if (opciones.incluirExcluidos) return 'TRUE';

    return `r."Request_Board_Column_ID" NOT IN (${COLUMNAS_NO_PLANIFICADAS.join(', ')})
        AND NOT EXISTS (
        SELECT 1 FROM "TBL_Request_Labels" bl
        WHERE bl."Request_Labels_Request_ID" = r."Request_ID"
        AND bl."Request_Labels_Label_ID" IN (${ETIQUETAS_BLOQUEADO.join(', ')})
        )`;
  }
}
