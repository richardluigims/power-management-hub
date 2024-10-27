import { Component, OnInit } from '@angular/core';
import { AparelhosService } from '../../services/aparelhos/aparelhos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-aparelhos',
  standalone: true,
  imports: [],
  templateUrl: './aparelhos.component.html',
  styleUrl: './aparelhos.component.scss'
})
export class AparelhosComponent implements OnInit {

  aparelhos = null;

  constructor(
    private aparelhosService: AparelhosService,
    private usuariosService: UsuariosService
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
    })
  }

}
