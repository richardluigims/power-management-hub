import { BehaviorSubject } from "rxjs";

export interface DeviceControl {
    id: string;
    isPowerOn: boolean;
    minutes: number;
    seconds: number;
    behaviorSubject: BehaviorSubject<any> | null;
    intervalId: any;
}