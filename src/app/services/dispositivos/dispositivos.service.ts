import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {
  private API_URL = 'http://localhost:3000/';  // URL to web api

  constructor(
    private httpClient: HttpClient
  ) { }

  getDispositivos(): Promise<any> {
    let url = this.API_URL + "dispositivos";

    return firstValueFrom(this.httpClient.get(url));
  }

  createDispositivo(novoDispositivo: any): Promise<any> {
    let url = this.API_URL + "dispositivos";

    return firstValueFrom(this.httpClient.post(url, novoDispositivo));
  }

  deleteDispositivo(idDispositivo: number): Promise<any> {
    let url = this.API_URL + "dipositivos/" + idDispositivo;

    return firstValueFrom(this.httpClient.delete(url));
  }
}
