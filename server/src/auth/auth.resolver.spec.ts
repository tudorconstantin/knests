import { Test, TestingModule } from "@nestjs/testing";

import { AuthModule } from "./auth.module";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

import { KnexModule } from "@nestjsplus/knex";
import { KnexConfig } from "../config/knex";

import { AuthResolver } from "./auth.resolver";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver],
      imports: [
        KnexModule.registerAsync({
          useClass: KnexConfig,
        }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s" },
        }),
        AuthModule,
        UsersModule,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
