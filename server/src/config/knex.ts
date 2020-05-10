import { Injectable } from '@nestjs/common';
import { KnexOptions } from '@nestjsplus/knex';

@Injectable()
export class KnexConfig {
  createKnexOptions(): KnexOptions {
    return {
      client: 'pg',
      debug: true,
      connection: process.env.DATABASE_URL,

      pool: { min: 2, max: 7 },
    };
  }
}
