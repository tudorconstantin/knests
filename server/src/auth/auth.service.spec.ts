import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { KnexModule } from "@nestjsplus/knex";
import { KnexConfig } from "../config/knex";

import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

import { UsersModule } from "../users/users.module";


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        KnexModule.registerAsync({
          useClass: KnexConfig,
        }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s" },
        }),
        UsersModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
