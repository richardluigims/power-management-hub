import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Device } from '../../interfaces/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private API_URL = 'http://localhost:3000/devices';

  constructor(
    private httpClient: HttpClient
  ) { }

  getDevices(): Promise<Device[]> {
    return firstValueFrom(this.httpClient.get<Device[]>(this.API_URL));
  }

  createDevice(newDevice: Device): Promise<Device> {
    return firstValueFrom(this.httpClient.post<Device>(this.API_URL, newDevice));
  }

  editDevice(device: Device): Promise<Device> {
    let url = this.API_URL + "/" + device.id;

    return firstValueFrom(this.httpClient.put<Device>(url, device));
  }

  deleteDevices(devicesIDs: string[]): Promise<Device[]> {
    return Promise.all(devicesIDs.map((deviceId) => {
      let url = this.API_URL + "/" + deviceId;

      return firstValueFrom(this.httpClient.delete<Device>(url));
    }));
  }
}
