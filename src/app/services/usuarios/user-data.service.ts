import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any = {
    loggedUser: null,
    usuarios: null,
    aparelhos: null
  };

  private userDataSubject = new BehaviorSubject<any>(this.userData);

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

    this.userDataSubject.next(this.userData);
  }

  removeUserData() {
    this.userData.loggedUser = null;
    this.userData.usuarios = null;
    this.userData.aparelhos = null;
  }

  watchLoggedUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  getLoggedUserData(): any {
    return this.userData;
  }
}
