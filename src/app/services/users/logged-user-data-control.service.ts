import { Injectable } from '@angular/core';
import { LoggedUserData } from '../../interfaces/logged-user-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataControlService {
  private loggedUserData: LoggedUserData = {
    loggedUser: null,
    users: null,
    devices: null,
  }

  private userDataSubject = new BehaviorSubject<LoggedUserData>(this.loggedUserData);

  constructor() { }

  setLoggedUserData(userData: LoggedUserData): void {
    this.loggedUserData =
    {
      loggedUser: (userData.loggedUser != undefined) ? userData.loggedUser : this.loggedUserData.loggedUser,
      users: (userData.users != undefined) ? userData.users : this.loggedUserData.users,
      devices: (userData.devices != undefined) ? userData.devices : this.loggedUserData.devices
    };

    this.userDataSubject.next(this.loggedUserData);
  }

  watchLoggedUserData(): Observable<LoggedUserData> {
    return this.userDataSubject.asObservable();
  }

  removeUserData() {
    this.loggedUserData.loggedUser = null;
    this.loggedUserData.users = null;
    this.loggedUserData.devices = null;
  }
}
