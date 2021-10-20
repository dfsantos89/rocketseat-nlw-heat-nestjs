import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  authenticateUser(code :string): Observable<AxiosResponse> {
    const url = 'https://github.com/login/oauth/access_token';

    return this.httpService.post(url, {
      params: {
        client_id: this.configService.get('GITHUB_CLIENT_ID'),
        client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
        code,
      }
    });
  }
}
