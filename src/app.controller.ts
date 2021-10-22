import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

class AuthenticateDto {
  code: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('github')
  @Redirect()
  github() {
    return { 
      url: `https://github.com/login/oauth/authorize?client_id=${this.configService.get<string>('GITHUB_CLIENT_ID')}`
    };
  }

  @Get('signin/callback')
  authorizeCallback(@Query('code') code: string) {
    return code;
  }

  // @Post('authenticate')
  @Get('authenticate')
  // authenticate(@Body() auth :AuthenticateDto) {
  authenticate(@Query('code') code: string) {
    // return this.appService.authenticateUser(auth.code);
    return this.appService.authenticateUser(code);
  }
}
