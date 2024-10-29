import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../services/usuarios/user-data.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy {

  loggedUserData: any;
  usuarios: any;
  loggedUser: any;
  userDataSubscription: any;
  usuariosSelecionados = new Array<any>();
  showSelectOptions: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private usuariosService: UsuariosService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.markUserAsLoggedIn();
    }

    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.usuarios = data.usuarios;
      this.loggedUser = data.loggedUser;

      if (this.usuarios) {
        this.usuarios.sort((a: any, b: any) => {
          if (a.id == this.loggedUser.id)
            return -1;
  
          if (b.id == this.loggedUser.id)
            return 1;
  
          return 0;
        })
      }      
    });

    if (this.usuarios == null) {
      this.getUsuarios();
    }
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().then((result) => {
      this.usuarios = result;

      let loggedUserData = {
        usuarios: this.usuarios
      }

      this.userDataService.setLoggedUserData(loggedUserData);
    })
  }

  criarUsuario() {

  }

  displaySelectOptions() {
    document.querySelector("#usuarios-container")?.classList.add('show-select-options');

    this.showSelectOptions = true;
  }

  hideSelectOptions() {
    document.querySelector("#usuarios-container")?.classList.remove('show-select-options');

    this.showSelectOptions = false;
    this.usuariosSelecionados = new Array<any>();
  }

  onChange(event: any) {
    let usuarioId = event.target.value;

    if (this.usuariosSelecionados.includes(usuarioId)) {
      this.usuariosSelecionados = this.usuariosSelecionados.filter(id => id!== usuarioId);
    }
    else {
      this.usuariosSelecionados.push(usuarioId);
    }
  }
  
  excluirUsuarios() {
    if (this.usuariosSelecionados.length == 0) {
      return;
    }

    this.usuariosService.deleteUsuarios(this.usuariosSelecionados).then((response) => {
      let usuarios = this.userDataService.getLoggedUserData().usuarios;
      
      usuarios = usuarios.filter((usuario: any) => !this.usuariosSelecionados.includes(usuario.id));

      this.userDataService.setLoggedUserData({ usuarios: usuarios });
      this.hideSelectOptions();
    });
  }
}
