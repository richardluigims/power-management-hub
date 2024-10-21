import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = 'http://localhost:3000/';
  private isUserLoggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(palavraPasse: any): Promise<any> {
    let url = this.API_URL + "usuarios";

    return firstValueFrom(this.httpClient.get(url, {
      params: {
        palavraPasse: palavraPasse
      }
    }))
    .then((user: any) => {
      let result = user.length > 0 ? user[0] : null;

      return result;
    });
  }

  logUserIn(): void {
    this.isUserLoggedIn = true;
  }

  logUserOut(): void {
    this.isUserLoggedIn = false;
  }

  isUserLogged(): boolean {
    return this.isUserLoggedIn;
  }

  setLog(value: boolean): void {
    this.isUserLoggedIn = value;
  }
}
