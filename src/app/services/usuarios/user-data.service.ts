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

  constructor() { }

  setLoggedUserData(data: any): void {
    this.userData =
    {
      loggedUser: (data.loggedUser != undefined) ?
                  data.loggedUser : this.userData.loggedUser,

      usuarios: (data.usuarios != undefined) ?
                data.usuarios : this.userData.usuarios,

      aparelhos: (data.aparelhos != undefined) ?
                  data.aparelhos : this.userData.aparelhos
    };
  }

  removeUserData() {
    this.userData.loggedUser = null;
    this.userData.usuarios = null;
    this.userData.aparelhos = null;
  }

  getLoggedUserData(): any {
    return this.userData;
  }
}
