import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalNovoAparelhoControlService {

  private modalNovoAparelhoControl = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleModalNovoAparelho(): void {
    this.modalNovoAparelhoControl.next(!this.modalNovoAparelhoControl.value);
  }

  getModalNovoAparelhoControl(): Observable<boolean> {
    return this.modalNovoAparelhoControl.asObservable();
  }
}
