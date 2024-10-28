import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  
  isUserLoggedIn: boolean = false;
  loggedUser: any;

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.watchingUserLogState().subscribe((userLogState) => {
      this.isUserLoggedIn = userLogState;

      this.loggedUser = this.usuariosService.getLoggedUserData();

      this.changeDetectorRef.detectChanges();
    })
  }
}
