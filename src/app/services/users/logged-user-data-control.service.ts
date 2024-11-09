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

  setLoggedUserData(newUserData: LoggedUserData): void {
    this.loggedUserData =
    {
      loggedUser: (newUserData.loggedUser != undefined) ? newUserData.loggedUser : this.loggedUserData.loggedUser,
      users: (newUserData.users != undefined) ? newUserData.users : this.loggedUserData.users,
      devices: (newUserData.devices != undefined) ? newUserData.devices : this.loggedUserData.devices
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

  getLoggedUserData(): LoggedUserData {
    return this.userDataSubject.value;
  }
}
