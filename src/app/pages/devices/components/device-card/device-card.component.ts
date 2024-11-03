import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceControlService } from '../../../../services/devices/device-control.service';
import { DeviceTypeEnum } from '../../../../enums/device-type-enum';
import { RoomEnum } from '../../../../enums/room-enum';
import { Device } from '../../../../interfaces/device';
import { DeviceControl } from '../../../../interfaces/device-control';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss'
})
export class DeviceCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() device: Device | null = null;
  @Output() idEmitter = new EventEmitter<any>();

  minutes: number = 0;
  seconds: number = 0;
  activeTime: string | null = null;
  isPowerOn: boolean = false;
  deviceElement: HTMLElement | null = null;
  deviceTypeEnum = DeviceTypeEnum;
  roomEnum = RoomEnum;
  activeTimeSubscription: Subscription | null = null;

  constructor(
    private deviceControlService: DeviceControlService
  ) { }

  ngOnInit(): void {
    let device;
    
    if (this.device?.id) {
      device = this.deviceControlService.getDevice(this.device.id);

      if (!device) {
        this.deviceControlService.addDevice(this.device.id);
      }
      else {
        this.loadDeviceControlData(device);
      }
    }
  }

  ngAfterViewInit(): void {
    this.deviceElement = document.querySelector("#aparelho_" + this.device?.id);

    if (this.isPowerOn) {
      this.powerOn();
    }
  }

  powerOn() {
    this.formatTime();
    
    this.activeTimeSubscription = this.deviceControlService.turnOnDevice(this.device?.id!).subscribe((time: any) => {
      this.seconds = time.seconds;
      this.minutes = time.minutes;

      this.formatTime();
    });

    this.isPowerOn = true;

    this.toggleDeviceStyle();
  }

  ngOnDestroy(): void {
    this.activeTimeSubscription?.unsubscribe();
  }

  powerOff() {
    this.resetActiveTime();

    this.isPowerOn = false;
    this.deviceControlService.turnOffDevice(this.device?.id!);

    this.toggleDeviceStyle();
  }

  resetActiveTime() {
    this.seconds = 0;
    this.minutes = 0;
    this.activeTime = null;
  }

  loadDeviceControlData(aparelho: DeviceControl) {
    this.isPowerOn = aparelho.isPowerOn;
    this.minutes = aparelho.minutes;
    this.seconds = aparelho.seconds;

    if (this.isPowerOn) {
      this.formatTime();
    }
  }

  formatTime() {
    let formatedMinutes = this.minutes >= 10 ? this.minutes : "0" + this.minutes;
    let formatedSeconds = this.seconds >= 10 ? this.seconds : "0" + this.seconds;

    this.activeTime = formatedMinutes + ":" + formatedSeconds;
  }

  emitIdToParent(event: any) {
    let id = event.target.value;

    this.idEmitter.emit(id);
  }

  toggleDeviceStyle() {
    this.deviceElement?.classList.toggle('on');
  }
}
