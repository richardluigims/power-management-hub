import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
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
