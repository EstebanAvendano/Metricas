import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import pg from 'pg';

@Injectable()
export class BaseDatosService implements OnModuleDestroy {
  private readonly pool: pg.Pool;

  constructor(config: ConfigService) {
    this.pool = new pg.Pool({
      connectionString: config.get<string>('DATABASE_URL'),
    });
  }

  async consultar<T>(sql: string, parametros: unknown[] = []): Promise<T[]> {
    try {
      const resultado = await this.pool.query(sql, parametros);
      return resultado.rows as T[];
    } catch (error: any) {
      const pos = Number(error.position) || 0;
      console.error('=== ERROR SQL (BaseDatosService) ===');
      console.error('Mensaje:', error.message);
      console.error('Posición:', pos);
      console.error(
        'Cerca de:',
        JSON.stringify(sql.slice(Math.max(0, pos - 80), pos + 30)),
      );
      console.error('SQL completo:\n', sql);
      console.error('Parámetros:', parametros);
      console.error('Llamado desde:\n', new Error().stack);
      console.error('====================================');
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
