import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared-components/header/header.component";
import { ModalNovoAparelhoComponent } from './pages/aparelhos/components/modal-novo-aparelho/modal-novo-aparelho.component';
import { ModalNovoUsuarioComponent } from "./pages/usuarios/components/modal-novo-usuario/modal-novo-usuario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ModalNovoAparelhoComponent, ModalNovoUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
