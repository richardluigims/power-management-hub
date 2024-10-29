import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalNovoUsuarioControlService {
  private modalNovoUsuarioControl = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleModalNovoUsuario(): void {
    this.modalNovoUsuarioControl.next(!this.modalNovoUsuarioControl.value);
  }

  getModalNovoUsuarioControl(): Observable<boolean> {
    return this.modalNovoUsuarioControl.asObservable();
  }
}
