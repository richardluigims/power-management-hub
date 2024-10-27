import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = 'http://localhost:3000/';
  private isUserLogged: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private usuariosService: UsuariosService
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

  markUserAsLoggedIn() {
    this.isUserLogged = true;
  }

  markUserAsLoggedOut() {
    this.isUserLogged = false;

    let loggedUserData = {
      loggedUser: undefined,
      aparelhos: undefined,
      usuarios: undefined
    }

    this.usuariosService.setLoggedUserData(loggedUserData);
  }

  isUserLoggedIn(): boolean {
    return this.isUserLogged;
  }

  // logUserIn(): void {
  //   this.isUserLogged = true;
  // }

  // logUserOut(): void {
  //   this.isUserLogged = false;
  // }

  // isUserLogged(): boolean {
  //   return this.isUserLogged;
  // }

  // setLog(value: boolean): void {
  //   this.isUserLogged = value;
  // }
}
