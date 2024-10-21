import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HeaderComponent } from "./shared-components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  constructor(
    private usuariosService: UsuariosService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }
}
