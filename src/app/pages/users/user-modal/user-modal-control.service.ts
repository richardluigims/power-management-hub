import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModalData } from '../../../interfaces/user-modal-data';

@Injectable({
  providedIn: 'root'
})
export class UserModalControlService {
  private userModalSubject = new BehaviorSubject<UserModalData>({isActive: false});

  constructor() { }

  openUserModal(userModalData?: UserModalData) {
    userModalData?.user?
      this.userModalSubject.next(userModalData) :
      this.userModalSubject.next({isActive: true});
  }

  closeUserModal() {
    this.userModalSubject.next({isActive: false});
  }

  getUserModalControl(): Observable<UserModalData>  {
    return this.userModalSubject.asObservable();
  }
}
