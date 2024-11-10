import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceModalData } from '../../../../interfaces/device-modal-data';
import { Device } from '../../../../interfaces/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceModalControlService {
  private deviceModalSubject = new BehaviorSubject<DeviceModalData>({isActive: false});

  constructor() { }

  openDeviceModal(device?: Device) {
    if (device) {
      let deviceModalData = {
        isActive: true,
        device: device
      }

      this.deviceModalSubject.next(deviceModalData)
    }
    else {
      this.deviceModalSubject.next({isActive: true});
    }
  }

  closeDeviceModal() {
    this.deviceModalSubject.next({isActive: false});
  }

  getDeviceModalControl(): Observable<DeviceModalData> {
    return this.deviceModalSubject.asObservable();
  }
}
