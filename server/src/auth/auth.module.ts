import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";

import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
