import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  loggedUserData: any;
  loggedUser: any;
  userOptionsButtonContainer: any;
  
  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.loggedUserData = this.usuariosService.getLoggedUserData();
    
    if (this.loggedUserData.loggedUser == null) {
      this.getUser();
    }
    else {
      this.loggedUser = this.loggedUserData.loggedUser;
    }
  }

  ngAfterViewInit(): void {
      this.userOptionsButtonContainer = document.querySelector("#user-options-button-container");
  }

  getUser() {
    let userId = localStorage.getItem('userId') as string;

    this.usuariosService.getUsuario(userId).then((result) => {
      console.log(result);
      this.loggedUser = result[0];
    })
  }

  showUserOptions() {
    this.userOptionsButtonContainer.classList.toggle('show-user-options');
  }

  navigateTo(url: string, event: any): void {
    this.router.navigateByUrl("/" + url);

    document.querySelector(".active")?.classList.toggle("active");

    event.target.classList.toggle('active');
  }
}
