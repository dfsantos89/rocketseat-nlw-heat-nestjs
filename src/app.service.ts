import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { concatAll, map, Observable } from 'rxjs';

type AccessToken = {
  access_token: string;
}

type User = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  authenticateUser(code :string) : Observable<AxiosResponse<User>> {
    const url = 'https://github.com/login/oauth/access_token';

    return this.httpService.post<AccessToken>(url, {
      client_id: this.configService.get('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
      code
    }).pipe(
      map(({ data: accesTokenResponse }) => this.httpService.get<User>('https://api.github.com/user') ), 
      concatAll()
    );
  }
}
