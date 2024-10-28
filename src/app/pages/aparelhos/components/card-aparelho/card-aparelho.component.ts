import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AparelhoEnum } from '../../../../enums/aparelho-enum';
import { AparelhosControlService } from '../../../../services/aparelhos/aparelhos-control.service';

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

  constructor(
    private aparelhosControlService: AparelhosControlService
  ) { }

  ngOnInit(): void {
    let aparelho = this.aparelhosControlService.getAparelho(this.aparelho.id)

    if (aparelho == null || aparelho == undefined) {
      this.aparelhosControlService.addAparelho(this.aparelho.id);
    }
    else {
      this.isPowerOn = aparelho.isPowerOn;
      this.minutos = aparelho.minutos;
      this.segundos = aparelho.segundos;
      this.formatTime();
    }
  }

  ngAfterViewInit(): void {
    this.aparelhoElement = document.querySelector("#aparelho_" + this.aparelho.id);

    if (this.isPowerOn) {
      this.powerOn();
    }
  }

  powerOn() {
    this.formatTime();
    this.aparelhosControlService.ligarAparelho(this.aparelho.id);

    this.countingSeconds = setInterval(() => {
      this.segundos++;

      if (this.segundos == 60) {
        this.segundos = 0;
        this.minutos++;
      }

      this.formatTime();

      this.aparelhosControlService.setTempoLigado(this.aparelho.id, this.minutos, this.segundos);
    }, 1000);

    this.isPowerOn = true;

    this.aparelhoElement?.classList.toggle('on');
  }

  powerOff() {
    clearInterval(this.countingSeconds);

    this.segundos = 0;
    this.minutos = 0;
    this.tempoLigado = null;

    this.isPowerOn = false;
    this.aparelhosControlService.desligarAparelho(this.aparelho.id);

    this.aparelhoElement?.classList.toggle('on');
  }

  formatTime() {
    let formatedMinutes = this.minutos >= 10 ? this.minutos : "0" + this.minutos;
    let formatedSeconds = this.segundos >= 10 ? this.segundos : "0" + this.segundos;

    this.tempoLigado = formatedMinutes + ":" + formatedSeconds;
  }
}
