import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {LoginDTO} from './dto/login.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });

  }

  async validate(credentials: LoginDTO): Promise<any> {
    const user = await this.authService.validateUser(credentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
