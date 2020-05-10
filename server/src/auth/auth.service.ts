import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { LoginDTO } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(login: LoginDTO): Promise<any> {
    const user = await this.usersService.findOne(login.email);
    if (!user) {
      return null;
    }

    const validPass = await bcrypt.compare(login.password, user.password);
    if (user && validPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const validatedUser = await this.validateUser(user);
    if (!validatedUser) { return null; }
    const payload = { email: validatedUser.email, userId: validatedUser.user_id };
    return {
      token: this.jwtService.sign(payload),
      user: validatedUser,
    };
  }
}
