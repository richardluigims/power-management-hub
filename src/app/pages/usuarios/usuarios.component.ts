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

  selecionarUsuarios() {

  }
}
