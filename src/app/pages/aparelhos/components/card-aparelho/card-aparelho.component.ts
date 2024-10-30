import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AparelhoEnum } from '../../../../enums/aparelho-enum';
import { AparelhosControlService } from '../../../../services/aparelhos/aparelhos-control.service';
import { ComodoEnum } from '../../../../enums/comodo-enum';

@Component({
  selector: 'app-card-aparelho',
  standalone: true,
  imports: [],
  templateUrl: './card-aparelho.component.html',
  styleUrl: './card-aparelho.component.scss'
})
export class CardAparelhoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() aparelho: any;
  minutos: number = 0;
  segundos: number = 0;
  tempoLigado: string | null = null;
  isPowerOn: boolean = false;
  aparelhoElement: HTMLElement | null = null;
  aparelhoEnum = AparelhoEnum;
  comodoEnum = ComodoEnum;
  tempoLigadoSubscription: any;

  @Output() idEmitter = new EventEmitter<any>();

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

      if (this.isPowerOn) {
        this.formatTime();
      }
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
    
    this.tempoLigadoSubscription = this.aparelhosControlService.ligarAparelho(this.aparelho.id).subscribe((time: any) => {
      this.segundos = time.segundos;
      this.minutos = time.minutos;

      this.formatTime();
    });

    this.isPowerOn = true;

    this.aparelhoElement?.classList.toggle('on');
  }

  ngOnDestroy(): void {
    if (this.tempoLigadoSubscription) {
      this.tempoLigadoSubscription.unsubscribe();
    }
  }

  powerOff() {
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

  onChange(event: any) {
    let id = event.target.value;

    this.idEmitter.emit(id);
  }
}
