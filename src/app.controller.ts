import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

type GithubResponse = {
  url: string;
};

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
  github() : GithubResponse {
    const client_id = this.configService.get<string>('GITHUB_CLIENT_ID');

    return { url: `https://github.com/login/oauth/authorize?client_id=${client_id}` };
  }

  @Get('signin/callback')
  authorizeCallback(@Query('code') code: string) {
    
  }

  @Post('authenticate')
  authenticate(@Body() auth :AuthenticateDto) {
    return this.appService.authenticateUser(auth.code);
  }
}
