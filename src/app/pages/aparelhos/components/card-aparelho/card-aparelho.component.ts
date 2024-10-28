import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AparelhoEnum } from '../../../../enums/aparelho-enum';

@Component({
  selector: 'app-card-aparelho',
  standalone: true,
  imports: [],
  templateUrl: './card-aparelho.component.html',
  styleUrl: './card-aparelho.component.scss'
})
export class CardAparelhoComponent implements AfterViewInit {
  @Input() aparelho: any;
  minutos: number = 0;
  segundos: number = 0;
  tempoLigado: string | null = null;
  countingSeconds: any = null;
  isPowerOn: boolean = false;
  aparelhoElement: HTMLElement | null = null;
  aparelhoEnum = AparelhoEnum;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
      this.aparelhoElement = document.querySelector("#aparelho_" + this.aparelho.id);
  }

  togglePowerOnOff() {
    if (!this.isPowerOn) {
      this.formatTime();

      this.countingSeconds = setInterval(() => {
        this.segundos++;

        if (this.segundos > 60) {
          this.segundos = 0;
          this.minutos++;
        }

        this.formatTime();
      }, 1000);

      this.isPowerOn = true;      
    }
    else {
      clearInterval(this.countingSeconds);

      this.segundos = 0;
      this.minutos = 0;
      this.tempoLigado = null;

      this.isPowerOn = false;
    }

    this.aparelhoElement?.classList.toggle('on');
  }

  formatTime() {
    let formatedMinutes = this.minutos > 10 ? this.minutos : "0" + this.minutos;
    let formatedSeconds = this.segundos > 10 ? this.segundos : "0" + this.segundos;

    this.tempoLigado = formatedMinutes + ":" + formatedSeconds;
  }
}
