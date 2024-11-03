import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../../../services/users/user-data.service';
import { DevicesService } from '../../../../services/devices/devices.service';
import { DeviceModalService } from './device-control-modal.service';
import { Device } from '../../../../interfaces/device';
import { DeviceModalData } from '../../../../interfaces/device-modal-data';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.scss'
})
export class DeviceModalComponent implements OnInit, AfterViewInit {
  modalElement: HTMLDialogElement | null = null;
  controlSubscription: any;
  deviceForm: any;
  isActive: boolean = false;
  device: Device | undefined;
  editModeEnabled: boolean = false;

  constructor(
    private deviceModalService: DeviceModalService,
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private devicesService: DevicesService
  ) { }

  ngOnInit(): void {
    this.controlSubscription = this.deviceModalService.getDeviceModalControl().subscribe((deviceModalData: DeviceModalData) => {
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
      let aparelhosRegistrados = [
        ...this.userDataService.getLoggedUserData().aparelhos,
        response
      ];

      this.userDataService.setLoggedUserData({
        aparelhos: aparelhosRegistrados
      });

      this.closeModal();
    })
  }

  editDevice() {
    if (this.deviceForm.invalid) {
      return;
    }

    let device = {
      type: this.deviceForm.get('type').value,
      about: this.deviceForm.get('about').value,
      room: this.deviceForm.get('room').value,
    }

    this.devicesService.editDevice(device).then((response) => {
      let registeredDevices = this.userDataService.getLoggedUserData().aparelhos;
      let editedDeviceIndex = registeredDevices.findIndex((device: Device) => device.id == response.id);
      registeredDevices[editedDeviceIndex] = response;

      this.userDataService.setLoggedUserData({
        aparelhos: registeredDevices
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
