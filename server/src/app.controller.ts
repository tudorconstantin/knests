import { Controller, Request, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/api/migrate')
  async migrateUp(): Promise<string> {
    return await this.appService.migrateUp('up', {});
  }
}
