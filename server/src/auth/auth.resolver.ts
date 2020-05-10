import { Resolver, Mutation, Args } from '@nestjs/graphql';

import {LoginDTO} from './dto/login.dto';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation('login')
  async login(@Args('user') user: LoginDTO){
    const jwtToken = await this.authService.login(user);

    if(!jwtToken) throw new UnauthorizedException();

    return jwtToken;
  }
}
