import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UserDataService } from '../userData/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = 'http://localhost:3000/';
  private isUserLogged: boolean = false;

  private loginSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private usuariosService: UsuariosService,
    private userDataService: UserDataService
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
    this.loginSubject.next(this.isUserLogged);
  }

  markUserAsLoggedOut() {
    this.isUserLogged = false;

    let loggedUserData = {
      loggedUser: null,
      aparelhos: null,
      usuarios: null
    }

    this.userDataService.setLoggedUserData(loggedUserData);

    this.loginSubject.next(this.isUserLogged);
  }

  watchingUserLogState(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  isUserLoggedIn(): boolean {
    return this.isUserLogged;
  }
}
