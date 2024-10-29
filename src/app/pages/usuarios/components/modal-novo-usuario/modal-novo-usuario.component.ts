import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalNovoUsuarioControlService } from './modal-novo-usuario-control.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { UserDataService } from '../../../../services/usuarios/user-data.service';

@Component({
  selector: 'app-modal-novo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-novo-usuario.component.html',
  styleUrl: './modal-novo-usuario.component.scss'
})
export class ModalNovoUsuarioComponent implements OnInit, AfterViewInit {
  modal: any;
  novoUsuarioForm: any;
  controlSubscription: any;

  constructor(
    private modalControlService: ModalNovoUsuarioControlService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      nome: [null, Validators.required],
      palavraPasse: [null, Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.modal = document.querySelector("#modal-novo-usuario");

    this.controlSubscription = this.modalControlService.getModalNovoUsuarioControl().subscribe((modalState) => {
      modalState ?
        this.modal.showModal() :
        this.modal.close()
    })
  }

  criarUsuario() {
    if (this.novoUsuarioForm.invalid) {
      return;
    }

    let novoUsuario = {
      nome: this.novoUsuarioForm.get('nome').value,
      palavraPasse: this.novoUsuarioForm.get('palavraPasse').value      
    }

    this.usuarioService.createUsuario(novoUsuario).then((response) => {
      let usuariosRegistrados = [
        ...this.userDataService.getLoggedUserData().usuarios,
        response
      ];

      this.userDataService.setLoggedUserData({
        usuarios: usuariosRegistrados
      });

      this.closeModal();
    })
  }

  onClose() {
    this.novoUsuarioForm.reset();
  }

  closeModal() {
    this.modalControlService.toggleModalNovoUsuario();
  }
}
