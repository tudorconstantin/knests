import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import knexMigrate from 'knex-migrate';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @InjectKnex() private readonly knex: Knex;
  async getHello(): Promise<string> {
    const users = await this.knex('users').select();
    return JSON.stringify(users);
  }

  /**
   * https://github.com/sheerun/knex-migrate
   *
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
