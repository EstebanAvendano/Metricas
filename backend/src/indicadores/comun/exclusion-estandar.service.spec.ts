import { Test, TestingModule } from '@nestjs/testing';
import { ExclusionEstandarService } from './exclusion-estandar.service.js';

describe('ExclusionEstandarService', () => {
  let servicio: ExclusionEstandarService;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [ExclusionEstandarService],
    }).compile();

    servicio = modulo.get(ExclusionEstandarService);
  });

  it('Por defecto excluye: Sin categorizar,Icebox,Backlog', () => {
    expect(servicio.condicion()).toContain(
      '"Request_Board_Column_ID" NOT IN (1, 2, 3)',
    );
  });
  it('por defecto excluye los tickets con etiqueta de bloqueado', () => {
    expect(servicio.condicion()).toContain(
      '"Request_Labels_Label_ID" IN (45, 77, 188, 201, 203)',
    );
  });

  it('no filtra nada si el reporte pide incluir los excluidos', () => {
    expect(servicio.condicion({ incluirExcluidos: true })).toBe('TRUE');
  });
});
