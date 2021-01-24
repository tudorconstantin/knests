import { Injectable, Inject, Logger } from '@nestjs/common';
import knexMigrate from 'knex-migrate';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Inject(KNEX_CONNECTION) private readonly knex;
  async getHello(): Promise<string> {
    const users = await this.knex('users').select();
    return JSON.stringify(users);
  }

  /**
   * https://github.com/sheerun/knex-migrate
   * @param command
   * @param flags 
   */
  async migrateUp(command: string, flags: object): Promise<string> {
    const cwd = './src';
    const knexfile = 'knexfile.js';

    const res = await knexMigrate(command, { ...flags, knexfile, cwd }, console.log);

    return 'success';
  }
}
