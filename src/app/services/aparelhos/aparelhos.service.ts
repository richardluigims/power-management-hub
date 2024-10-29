import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AparelhosService {
  private API_URL = 'http://localhost:3000/aparelhos';  // URL to web api

  constructor(
    private httpClient: HttpClient
  ) { }

  getAparelhos(): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.API_URL));
  }

  createAparelho(novoAparelho: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.API_URL, novoAparelho));
  }

  deleteAparelhos(idAparelhosArray: any[]): Promise<any> {
    return Promise.all(idAparelhosArray.map((aparelhoId) => {
      let url = this.API_URL + "/" + aparelhoId;

      return firstValueFrom(this.httpClient.delete(url));
    }));
  }
}
