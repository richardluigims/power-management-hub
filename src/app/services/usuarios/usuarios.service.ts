import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_URL = 'http://localhost:3000/';  // URL to web api
  private loggedUserData: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsuarios(): Promise<any> {
    let url = this.API_URL + "usuarios";

    return firstValueFrom(this.httpClient.get(url));
  }

  createUsuario(novoUsuario: any): Promise<any> {
    let url = this.API_URL + "usuarios";

    return firstValueFrom(this.httpClient.post(url, novoUsuario));
  }

  deleteUsuario(idUsuario: number): Promise<any> {
    let url = this.API_URL + "usuarios/" + idUsuario;

    return firstValueFrom(this.httpClient.delete(url));
  }

  setLoggedUserData(userData: any): void {
    this.loggedUserData = userData;
  }

  getLoggedUserData(): any {
    return this.loggedUserData;
  }
}
