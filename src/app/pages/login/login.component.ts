import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoggedUserDataControlService } from '../../services/users/logged-user-data-control.service';
import { User } from '../../interfaces/user';

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
    private userDataService: LoggedUserDataControlService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      accessWord: [null, Validators.required],
    });
  }

  ToggleInputVisibility(): void {
    this.inputType == "text" ? this.inputType = "password" : this.inputType = "text";
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    let accessWord = this.loginForm.get('accessWord').value;

    this.authService.login(accessWord).then((user: User) => {
      if (user) {
        localStorage.setItem('userId', user.id!);

        this.userDataService.setLoggedUserData({ loggedUser: user });

        this.router.navigateByUrl("/");
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

