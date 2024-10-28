import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  private intervalsArray = new Map<any, any>();

  constructor() { }

  startInterval(id: any, milliseconds: any, callback: () => void) {
    if (this.intervalsArray.has(id)) {
      this.stopInterval(id);
    }

    let intervalId = setInterval(callback, milliseconds);

    this.intervalsArray.set(id, intervalId);
  }

  stopInterval(id: any) {
    let intervalId = this.intervalsArray.get(id);

    if (intervalId != undefined) {
      clearInterval(intervalId);
      this.intervalsArray.delete(id);
    }
  }
}
