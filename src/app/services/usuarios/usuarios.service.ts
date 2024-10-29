import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_URL = 'http://localhost:3000/usuarios';  // URL to web api

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsuario(userId: string): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.API_URL, {
      params: {
        id: userId
      }
    })).then((user: any) => {
      let result = user[0];

      return result;
    })
  }

  getUsuarios(): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.API_URL));
  }

  createUsuario(novoUsuario: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.API_URL, novoUsuario));
  }

  deleteUsuarios(idUsuariosArray: any[]): Promise<any> {
    return Promise.all(idUsuariosArray.map((idUsuario) => {
      let url = this.API_URL + "/" + idUsuario;

      return firstValueFrom(this.httpClient.delete(url));
    }))
  }
}
