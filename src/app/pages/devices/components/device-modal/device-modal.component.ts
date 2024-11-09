import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevicesService } from '../../../../services/devices/devices.service';
import { DeviceModalControlService } from './device-modal-control.service';
import { Device } from '../../../../interfaces/device';
import { DeviceModalData } from '../../../../interfaces/device-modal-data';
import { Subscription } from 'rxjs';
import { LoggedUserDataControlService } from '../../../../services/users/logged-user-data-control.service';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.scss'
})
export class DeviceModalComponent implements OnInit, AfterViewInit {
  modalElement: HTMLDialogElement | null = null;
  modalControlSubscription: Subscription | null = null;
  deviceForm: any;
  isActive: boolean = false;
  device: Device | undefined;
  editModeEnabled: boolean = false;

  constructor(
    private deviceModalService: DeviceModalControlService,
    private formBuilder: FormBuilder,
    private userDataService: LoggedUserDataControlService,
    private devicesService: DevicesService
  ) { }

  ngOnInit(): void {
    this.modalControlSubscription = this.deviceModalService.getDeviceModalControl().subscribe((deviceModalData: DeviceModalData) => {
      this.isActive = deviceModalData.isActive;
      this.device = deviceModalData.device;

      this.isActive ?
        this.modalElement?.showModal() :
        this.modalElement?.close();

      if (this.device) {
        this.enableEditMode();
      }
    })

    this.deviceForm = this.formBuilder.group({
      type: [null, Validators.required],
      room: [null, Validators.required],
      about: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.modalElement = document.querySelector("#modal-novo-aparelho");
  }

  enableEditMode(): void {
    this.editModeEnabled = true;

    this.deviceForm.setValue({
      type: this.device?.type,
      room: this.device?.room,
      about: this.device?.about
    })
  }

  createDevice() {
    if (this.deviceForm.invalid) {
      return;
    }

    let newDevice = {
      type: this.deviceForm.get('type').value,
      about: this.deviceForm.get('about').value,
      room: this.deviceForm.get('room').value,
    }

    this.devicesService.createDevice(newDevice).then((response) => {
      let newDevices = [
        ...(this.userDataService.getLoggedUserData().devices) ?? [],
        response
      ];

      this.userDataService.setLoggedUserData({
        devices: newDevices
      });

      this.closeModal();
    })
  }

  editDevice() {
    if (this.deviceForm.invalid) {
      return;
    }

    let device = {
      id: this.device?.id,
      type: this.deviceForm.get('type').value,
      about: this.deviceForm.get('about').value,
      room: this.deviceForm.get('room').value,
    }

    this.devicesService.editDevice(device).then((response) => {
      let registeredDevices = this.userDataService.getLoggedUserData().devices;
      let editedDeviceIndex = registeredDevices!.findIndex((device: Device) => device.id == response.id);
      registeredDevices![editedDeviceIndex] = response;

      this.userDataService.setLoggedUserData({
        devices: registeredDevices
      });

      this.closeModal();
    })
  }

  onClose() {
    this.deviceForm.reset();
  }

  closeModal() {
    this.deviceModalService.closeDeviceModal();
  }
}
