import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UserDataService } from '../../services/usuarios/user-data.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  loggedUserData: any;
  loggedUser: any;
  routerSubscription: Subscription | null = null;
  
  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private userDataService: UserDataService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.loggedUserData = this.userDataService.getLoggedUserData();
    
    if (this.loggedUserData.loggedUser == null) {
      this.getUser();
    }
    else {
      this.loggedUser = this.loggedUserData.loggedUser;
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url == "/login") {          
          this.authService.markUserAsLoggedOut();
        }
      }
    })
  }

  ngAfterViewInit(): void {
    let url = this.router.url.split('/')[1];

    console.log(url);

    document.querySelector("#btn_navigate-" + url)?.classList.add('active');
  }

  criarNovoAparelho() {

  }

  getUser() {
    let userId = localStorage.getItem('userId') as string;

    this.usuariosService.getUsuario(userId).then((result) => {
      console.log(result);
      this.loggedUser = result[0];
    })
  }

  logout() {
    this.authService.markUserAsLoggedOut();
    this.router.navigateByUrl("/login");
  }

  navigateTo(url: string, event: any): void {
    this.router.navigateByUrl("/" + url);

    document.querySelector(".active")?.classList.toggle("active");

    event.target.classList.toggle('active');
  }
}
