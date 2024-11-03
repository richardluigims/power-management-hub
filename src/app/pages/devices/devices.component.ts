import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { Subscription } from 'rxjs';
import { DevicesService } from '../../services/devices/devices.service';
import { Device } from '../../interfaces/device';
import { LoggedUserDataControlService } from '../../services/users/logged-user-data-control.service';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    DeviceCardComponent
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent implements OnInit, OnDestroy {

  devices = new Array<Device>();
  userDataSubscription: Subscription | null = null;
  selectedDeviceIds = new Array<string>();

  constructor(
    private devicesService: DevicesService,
    private userDataService: LoggedUserDataControlService,
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.devices = data.devices || [];
    });
    
    if (this.devices.length == 0) {
      this.getDevices();
    }
  }

  ngOnDestroy(): void {
      this.userDataSubscription?.unsubscribe();
  }

  getDevices() {
    this.devicesService.getDevices().then((result) => {
      this.devices = result;
      this.userDataService.setLoggedUserData({ devices: this.devices});
    })
  }

  onDeviceSelect(deviceId: any) {
    let index = this.selectedDeviceIds.indexOf(deviceId);
    
    (index > -1) ?
      this.selectedDeviceIds.splice(index, 1) :
      this.selectedDeviceIds.push(deviceId);

    this.toggleDeleteButton();
  }

  deteleDevices() {
    if (this.selectedDeviceIds.length == 0) {
      return;
    }

    this.devicesService.deleteDevices(this.selectedDeviceIds).then(() => {
      let newDevices = this.devices.filter(device => !this.selectedDeviceIds.includes(device.id!));

      this.userDataService.setLoggedUserData({ devices: newDevices });
      this.selectedDeviceIds = new Array<any>();
      this.toggleDeleteButton();
    });
  }

  toggleDeleteButton() {
    let deleteButton = document.querySelector("#btn_excluir-aparelhos");
    deleteButton?.classList.toggle('show', this.selectedDeviceIds.length > 0);
  }
}
