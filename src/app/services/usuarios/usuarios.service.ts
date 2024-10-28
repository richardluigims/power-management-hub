import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_URL = 'http://localhost:3000/usuarios';  // URL to web api
  private userData: any = {
    loggedUser: null,
    usuarios: null,
    aparelhos: null
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsuario(userId: string): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.API_URL, {
      params: {
        id: userId
      }
    }))
  }

  getUsuarios(): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.API_URL));
  }

  createUsuario(novoUsuario: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.API_URL, novoUsuario));
  }

  deleteUsuario(idUsuario: number): Promise<any> {
    let url = this.API_URL + "usuarios/" + idUsuario;

    return firstValueFrom(this.httpClient.delete(url));
  }

  setLoggedUserData(userData: any): void {
    this.userData = {
      loggedUser: userData.loggedUser ? userData.loggedUser : this.userData.loggedUser,
      usuarios: userData.usuarios ? userData.usuarios : this.userData.usuarios,
      aparelhos: userData.aparelhos ? userData.aparelhos : this.userData.aparel
    };
  }

  getLoggedUserData(): any {
    return this.userData;
  }
}
