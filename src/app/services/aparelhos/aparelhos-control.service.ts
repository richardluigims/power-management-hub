import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
      segundos: 0,
      behaviorSubject: null,
      intervalId: null
    }

    this.aparelhosControlArray.push(aparelho);
  }

  getAparelho(aparelhoId: any) {
    return this.aparelhosControlArray.find((aparelho: any) => aparelho.id == aparelhoId);
  }

  ligarAparelho(aparelhoId: any): Observable<any> {
    let index = this.aparelhosControlArray.findIndex((aparelho: any) => aparelho.id == aparelhoId);

    this.aparelhosControlArray[index].isPowerOn = true;
    
    if (this.aparelhosControlArray[index].intervalId != null) {
      return this.aparelhosControlArray[index].behaviorSubject.asObservable();
    }

    let behaviorSubject = new BehaviorSubject<any>({
      minutos: this.aparelhosControlArray[index].minutos,
      segundos: this.aparelhosControlArray[index].segundos
    });

    let intervalId = setInterval(() => {
      this.aparelhosControlArray[index].segundos++;

      if (this.aparelhosControlArray[index].segundos == 60) {
        this.aparelhosControlArray[index].segundos = 0;
        this.aparelhosControlArray[index].minutos++;
      }

      behaviorSubject.next({
        minutos: this.aparelhosControlArray[index].minutos,
        segundos: this.aparelhosControlArray[index].segundos
      });
    }, 1000);

    this.aparelhosControlArray[index].behaviorSubject = behaviorSubject;
    this.aparelhosControlArray[index].intervalId = intervalId;

    return behaviorSubject.asObservable();
  }

  desligarAparelho(aparelhoId: number) {
    let index = this.aparelhosControlArray.findIndex((aparelho: any) => aparelho.id == aparelhoId);

    clearInterval(this.aparelhosControlArray[index].intervalId);

    let aparelho = {
      id: aparelhoId,
      isPowerOn: false,
      minutos: 0,
      segundos: 0,
      behaviorSubject: null,
      intervalId: null
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
