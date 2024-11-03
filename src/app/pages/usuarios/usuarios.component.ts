import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalNovoUsuarioControlService } from './components/modal-novo-usuario/modal-novo-usuario-control.service';
import { Subscription } from 'rxjs';
import { LoggedUserDataControlService } from '../../services/users/logged-user-data-control.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy {
  loggedUserData: any;
  usuarios = new Array<any>();
  loggedUser: any;
  userDataSubscription: Subscription | null =null;
  usuariosSelecionados = new Array<any>();
  showSelectOptions: boolean = false;

  constructor(
    private userDataService: LoggedUserDataControlService,
    private usersService: UsersService,
    private modalControl: ModalNovoUsuarioControlService
  ) { }

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.usuarios = data.usuarios || [];
      this.loggedUser = data.loggedUser;
    });

    if (this.usuarios.length > 0) {
      this.usuarios.sort((a: any, b: any) => {
        if (a.id == this.loggedUser.id)
          return -1;

        if (b.id == this.loggedUser.id)
          return 1;

        return 0;
      })
    }
    else {
      this.getUsuarios();
    }    
  }

  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().then((result) => {
      this.usuarios = result;

      this.userDataService.setLoggedUserData({ usuarios: this.usuarios });
    })
  }

  showModalNovoUsuario() {
    this.modalControl.toggleModalNovoUsuario();
  }

  toggleSelectOptions() {
    this.showSelectOptions = !this.showSelectOptions;

    document.querySelector("#usuarios-container")?.classList.toggle('show-select-options');

    if (!this.showSelectOptions) {
      this.usuariosSelecionados = new Array<any>();

      document.querySelectorAll(".checkbox-input").forEach((checkboxInput: any) => {
        checkboxInput.checked = false;
      })
    }
  }

  onChange(event: any) {
    let usuarioId = event.target.value;
    let index = this.usuariosSelecionados.indexOf(usuarioId);

    (index > -1) ?
      this.usuariosSelecionados.splice(index, 1) :
      this.usuariosSelecionados.push(usuarioId);
  }
  
  excluirUsuarios() {
    if (this.usuariosSelecionados.length == 0) {
      return;
    }

    this.usuariosService.deleteUsuarios(this.usuariosSelecionados).then((response) => {
      let usuarios = this.userDataService.getLoggedUserData().usuarios;
      
      usuarios = usuarios.filter((usuario: any) => !this.usuariosSelecionados.includes(usuario.id));

      this.userDataService.setLoggedUserData({ usuarios: usuarios });
      this.toggleSelectOptions();
    });
  }
}
