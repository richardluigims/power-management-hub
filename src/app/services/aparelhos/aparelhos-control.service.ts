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
    let aparelho = this.getAparelho(aparelhoId);

    aparelho.isPowerOn = true;

    if (aparelho.intervalId != null) {
      return aparelho.behaviorSubject.asObservable();
    }
    else {
      let behaviorSubject = new BehaviorSubject<any>({
        minutos: 0,
        segundos: 0
      });

      aparelho.behaviorSubject = behaviorSubject;

      let intervalId = setInterval(() => {
        console.log("incrementando");
        console.log(aparelhoId);
        this.incrementarTempo(aparelho);
      }, 1000);

      aparelho.intervalId = intervalId;

      return behaviorSubject.asObservable();
    }
  }

  incrementarTempo(aparelho: any) {
    aparelho.segundos++;

    if (aparelho.segundos == 60) {
      aparelho.segundos = 0;
      aparelho.minutos++;
    }

    aparelho.behaviorSubject.next({
      minutos: aparelho.minutos,
      segundos: aparelho.segundos
    })
  }

  desligarAparelho(aparelhoId: any) {
    let aparelho = this.getAparelho(aparelhoId);

    clearInterval(aparelho.intervalId);

    aparelho.isPowerOn = false;
    aparelho.minutos = 0;
    aparelho.segundos = 0;
    aparelho.intervalId = null;
    aparelho.behaviorSubject = null;
  }

  getAparelhosControlArray() {
    return this.aparelhosControlArray;
  }
}
