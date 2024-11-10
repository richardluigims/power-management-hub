import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModalData } from '../../../interfaces/user-modal-data';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserModalControlService {
  private userModalSubject = new BehaviorSubject<UserModalData>({isActive: false});

  constructor() { }

  openUserModal(user?: User) {
    if (user) {
      let userModalData = {
        isActive: true,
        user: user
      }

      this.userModalSubject.next(userModalData);
    }
    else {
      this.userModalSubject.next({isActive: true});
    }
  }

  closeUserModal() {
    this.userModalSubject.next({isActive: false});
  }

  getUserModalControl(): Observable<UserModalData>  {
    return this.userModalSubject.asObservable();
  }
}
