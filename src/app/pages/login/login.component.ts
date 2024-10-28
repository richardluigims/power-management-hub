import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AparelhosService } from '../../services/aparelhos/aparelhos.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: any;
  showOptions: boolean = false;
  inputType: string = "password";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private usuariosService: UsuariosService,
    private aparelhosService: AparelhosService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      palavraPasse: [null, Validators.required],
    });
  }

  ToggleInputVisibility(): void {
    this.inputType == "text" ? this.inputType = "password" : this.inputType = "text";
  }

  login() {
    let palavraPasse = this.loginForm.get('palavraPasse').value;

    if (palavraPasse === null) {
      return;
    }

    this.authService.login(palavraPasse).then((usuario) => {
      if (usuario != null) {
        localStorage.setItem('userId', usuario.id);

        let loggedUserData = {
          loggedUser: usuario
        }

        this.usuariosService.setLoggedUserData(loggedUserData);

        this.router.navigateByUrl("/aparelhos");
      }
      else {
        alert("Palavra-passe inválida.");
      }
    })
    .catch((error) => {
      alert("Serviço indisponível");
    });
  }
}
