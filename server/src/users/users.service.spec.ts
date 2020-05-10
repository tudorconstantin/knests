import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

import { KnexModule } from "@nestjsplus/knex";
import { KnexConfig } from "../config/knex";
import { AuthModule } from "../auth/auth.module";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        KnexModule.registerAsync({
          useClass: KnexConfig,
        }),
        AuthModule,
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);

  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create user", () => {

  });
});
