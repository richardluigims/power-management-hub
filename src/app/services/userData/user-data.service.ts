import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any = {
    loggedUser: null,
    usuarios: null,
    aparelhos: null
  };

  private aparelhosControlArray: any;

  constructor() { }

  setLoggedUserData(userData: any): void {
    this.userData =
    {
      loggedUser: (userData.loggedUser != null && userData.loggedUser != undefined) ?
                  userData.loggedUser : this.userData.loggedUser,

      usuarios: (userData.usuarios != null && userData.usuarios != undefined) ?
                userData.usuarios : this.userData.usuarios,

      aparelhos: (userData.aparelhos != null && userData.aparelhos != undefined) ?
                  userData.aparelhos : this.userData.aparelhos
    };
  }

  getLoggedUserData(): any {
    return this.userData;
  }

  setAparelhosControlArray(aparelhos: any) {
    this.aparelhosControlArray = aparelhos;
  }

  ligarAparelho(aparelhoId: number) {
    let index = this.aparelhosControlArray.FindIndex((aparelho: any) => aparelho.id == aparelhoId);
    
    let aparelho = {
      isPowerOn: true,
      minutos: 0,
      segundos: 0
    }

    this.aparelhosControlArray[index] = aparelho;
  }

  desligarAparelho(aparelhoId: number) {
    let index = this.aparelhosControlArray.FindIndex((aparelho: any) => aparelho.id == aparelhoId);

    let aparelho = {
      isPowerOn: false,
      minutos: 0,
      segundos: 0
    }

    this.aparelhosControlArray[index] = aparelho;
  }

  getAparelhosStateArray() {
    return this.aparelhosControlArray;
  }
}
