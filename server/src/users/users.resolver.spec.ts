import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersModule } from "../users/users.module";

import { KnexModule } from "@nestjsplus/knex";
import { KnexConfig } from "../config/knex";
import {CreateUserDTO} from "./dto/user-create.dto";

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver],
      imports: [
        KnexModule.registerAsync({
          useClass: KnexConfig,
        }),
        UsersModule,
      ],

    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', async () => {
    expect(resolver).toBeDefined();
  });
});
