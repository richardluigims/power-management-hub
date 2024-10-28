import { Component, OnInit } from '@angular/core';
import { AparelhosService } from '../../services/aparelhos/aparelhos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CardAparelhoComponent } from './components/card-aparelho/card-aparelho.component';

@Component({
  selector: 'app-aparelhos',
  standalone: true,
  imports: [
    CardAparelhoComponent
  ],
  templateUrl: './aparelhos.component.html',
  styleUrl: './aparelhos.component.scss'
})
export class AparelhosComponent implements OnInit {

  aparelhos: any = null;

  constructor(
    private aparelhosService: AparelhosService,
    private usuariosService: UsuariosService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.aparelhos = this.usuariosService.getLoggedUserData().aparelhos;
    
    if (this.aparelhos == null) {
      this.getAparelhos();
    }
  }

  getAparelhos() {
    this.aparelhosService.getAparelhos().then((result) => {
      this.aparelhos = result;

      let loggedUserData = {
        aparelhos: this.aparelhos
      }

      this.usuariosService.setLoggedUserData(loggedUserData);
      this.authService.markUserAsLoggedIn();
    })
  }
}
