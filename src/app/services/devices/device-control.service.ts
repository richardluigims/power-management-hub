import { Injectable } from '@angular/core';
import { DeviceControl } from '../../interfaces/device-control';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceControlService {
  private deviceControlArray = new Array<DeviceControl>();

  constructor() { }

  addDevice(deviceId: string) {
    let device: DeviceControl = {
      id: deviceId,
      isPowerOn: false,
      minutes: 0,
      seconds: 0,
      behaviorSubject: null,
      intervalId: null
    }

    this.deviceControlArray.push(device);
  }

  getDevice(deviceId: string): DeviceControl | undefined{
    return this.deviceControlArray.find((device: any) => device.id == deviceId);
  }

  turnOnDevice(deviceId: string): Observable<any> {
    let device = this.getDevice(deviceId) as DeviceControl;
    device.isPowerOn = true;

    if (device.intervalId != null) {
      return device.behaviorSubject?.asObservable()!;
    }
    else {
      let behaviorSubject = new BehaviorSubject<any>({
        minutes: 0,
        seconds: 0
      });

      device.behaviorSubject = behaviorSubject;

      let intervalId = setInterval(() => {
        this.increaseTime(device);
      }, 1000);

      device.intervalId = intervalId;

      return behaviorSubject.asObservable();
    }
  }

  increaseTime(device: DeviceControl) {
    device.seconds++;

    if (device.seconds == 60) {
      device.seconds = 0;
      device.minutes++;
    }

    device.behaviorSubject?.next({
      minutes: device.minutes,
      seconds: device.seconds
    })
  }

  turnOffDevice(deviceId: string) {
    let device = this.getDevice(deviceId);

    clearInterval(device?.intervalId);

    if (device) {
      device.isPowerOn = false;
      device.minutes = 0;
      device.seconds = 0;
      device.intervalId = null;
      device.behaviorSubject = null;
    }
  }
}
