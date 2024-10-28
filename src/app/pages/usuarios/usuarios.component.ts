import { Component, OnInit } from '@angular/core';
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
export class UsuariosComponent implements OnInit {

  usuarios: any;

  constructor(
    private userDataService: UserDataService,
    private usuariosService: UsuariosService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
      this.usuarios = this.userDataService.getLoggedUserData().usuarios;

      if (this.usuarios == null) {
        this.getUsuarios();
      }
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().then((result) => {
      this.usuarios = result;

      let loggedUserData = {
        usuarios: this.usuarios
      }

      this.userDataService.setLoggedUserData(loggedUserData);
      this.authService.markUserAsLoggedIn();
    })
  }

  criarUsuario() {

  }

  selecionarUsuarios() {
    
  }
}
