import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-aparelho',
  standalone: true,
  imports: [],
  templateUrl: './card-aparelho.component.html',
  styleUrl: './card-aparelho.component.scss'
})
export class CardAparelhoComponent {
  @Input() aparelho: any;
  tempoLigado: number = 0;
  countingMinutes: any = null;
  isPowerOn: boolean = false;

  constructor() { }

  togglePowerOnOff() {
    if (!this.isPowerOn) {
      this.countingMinutes = setInterval(() => {
        this.tempoLigado++;
      }, 60000);

      this.isPowerOn = true;
    }
    else {
      clearInterval(this.countingMinutes);
      this.tempoLigado = 0;
      this.isPowerOn = false;
    }
  }
}
