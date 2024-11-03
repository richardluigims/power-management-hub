import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceModalData } from '../../../../interfaces/device-modal-data';

@Injectable({
  providedIn: 'root'
})
export class DeviceModalService {
  private deviceModalSubject = new BehaviorSubject<DeviceModalData>({isActive: false});

  constructor() { }

  openDeviceModal(deviceModalData?: DeviceModalData) {
    deviceModalData?.device ?
      this.deviceModalSubject.next(deviceModalData) :
      this.deviceModalSubject.next({isActive: true});
  }

  closeDeviceModal() {
    this.deviceModalSubject.next({isActive: false});
  }

  getDeviceModalControl(): Observable<DeviceModalData> {
    return this.deviceModalSubject.asObservable();
  }
}
