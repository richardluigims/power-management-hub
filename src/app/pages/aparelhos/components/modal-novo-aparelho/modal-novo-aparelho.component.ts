import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalNovoAparelhoControlService } from './modal-novo-aparelho-control.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AparelhosService } from '../../../../services/aparelhos/aparelhos.service';

@Component({
  selector: 'app-modal-novo-aparelho',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-novo-aparelho.component.html',
  styleUrl: './modal-novo-aparelho.component.scss'
})
export class ModalNovoAparelhoComponent implements OnInit, AfterViewInit {
  modal: any;
  controlSubscription: any;
  novoAparelhoForm: any;

  constructor(
    private modalControlService: ModalNovoAparelhoControlService,
    private formBuilder: FormBuilder,
    private aparelhosService: AparelhosService
  ) { }

  ngOnInit(): void {
    this.novoAparelhoForm = this.formBuilder.group({
      tipo: [null, Validators.required],
      comodo: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.modal = document.querySelector("#modal");

    this.controlSubscription = this.modalControlService.getModalNovoAparelhoControl().subscribe((modalState) => {
      modalState ?
        this.modal.showModal() :
        this.modal.close()
    })
  }

  criarAparelho() {
    if (this.novoAparelhoForm.invalid) {
      return;
    }

    let novoAparelho = {
      tipo: this.novoAparelhoForm.get('tipo').value,
      descricao: this.novoAparelhoForm.get('descricao').value,
      comodo: this.novoAparelhoForm.get('comodo').value,
    }

    console.log(novoAparelho);

    this.aparelhosService.createAparelho(novoAparelho).then((response) => {
      console.log(response);
    })
  }

  onClose() {
    this.novoAparelhoForm.reset();
  }

  closeModal() {
    this.modalControlService.toggleModalNovoAparelho();
  }
}
