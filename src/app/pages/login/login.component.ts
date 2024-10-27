import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

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
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      palavraPasse: [null, Validators.required],
    });
  }

  ToggleInputVisibility(inputId: string): void {
    this.inputType == "text" ? this.inputType = "password" : this.inputType = "text";
  }

  login() {
    let palavraPasse = this.loginForm.get('palavraPasse').value;

    if (palavraPasse === null) {
      return;
    }

    this.authService.login(palavraPasse).then((result) => {
      console.log(result);
    });
  }
}
