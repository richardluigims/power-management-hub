import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = 'http://localhost:3000/users';

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(accessWord: any): Promise<User> {
    return firstValueFrom(this.httpClient.get(this.API_URL, {
      params: {
        accessWord: accessWord
      }
    }))
    .then((response: any) => {
      let user = response.length > 0 ? response[0] : null;

      return user;
    });
  }
}
