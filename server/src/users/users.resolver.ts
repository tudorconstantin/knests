import {Resolver, Args, Query, Mutation, Parent, ResolveField} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UserSignupDTO } from './dto/user-signup.dto';


@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Query('user')
  async getUser(@Args('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.findById(userId);
  }

  @ResolveField()
  async roles(@Parent() user) {
    return user.roles || [];
  }

  @Mutation('signup')
  async signup(@Args('user') user: UserSignupDTO) {
    return this.usersService.signup(user);
  }
}
