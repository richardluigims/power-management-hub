import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AparelhosControlService {
  private aparelhosControlArray: any = [];

  constructor() { }

  addAparelho(aparelhoId: any) {
    let aparelho = {
      id: aparelhoId,
      isPowerOn: false,
      minutos: 0,
      segundos: 0
    }

    this.aparelhosControlArray.push(aparelho);
  }

  getAparelho(aparelhoId: number) {
    return this.aparelhosControlArray.find((aparelho: any) => aparelho.id == aparelhoId);
  }

  ligarAparelho(aparelhoId: number) {
    let index = this.aparelhosControlArray.findIndex((aparelho: any) => aparelho.id == aparelhoId);

    this.aparelhosControlArray[index].isPowerOn = true;
  }

  desligarAparelho(aparelhoId: number) {
    let index = this.aparelhosControlArray.findIndex((aparelho: any) => aparelho.id == aparelhoId);

    let aparelho = {
      id: aparelhoId,
      isPowerOn: false,
      minutos: 0,
      segundos: 0
    }

    this.aparelhosControlArray[index] = aparelho;
  }

  setTempoLigado(aparelhoId: number, minutos: number, segundos: number) {
    let index = this.aparelhosControlArray.findIndex((aparelho: any) => aparelho.id == aparelhoId);

    this.aparelhosControlArray[index].minutos = minutos;
    this.aparelhosControlArray[index].segundos = segundos;
  }

  getAparelhosControlArray() {
    return this.aparelhosControlArray;
  }
}
