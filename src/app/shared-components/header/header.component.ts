import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  loggedUser: any;
  routerSubscription: Subscription | null = null;
  userDataSubscription: any;
  
  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private userDataService: UserDataService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.getLoggedUserData().subscribe((data) => {
      this.loggedUser = data.loggedUser;
    })
    
    if (this.loggedUser == null) {
      this.getUser();
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url == "/login") {          
          this.authService.markUserAsLoggedOut();
          localStorage.clear();
        }
      }
    })
  }

  ngAfterViewInit(): void {
    let currentRoute = this.router.url.split('/')[1];

    document.querySelector("#btn_navigate-" + currentRoute)?.classList.add('active');
  }

  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe();
  }

  criarNovoAparelho() {

  }

  getUser() {
    let userId = localStorage.getItem('userId') as string;

    this.usuariosService.getUsuario(userId).then((result) => {
      if (result != null) {
        this.userDataService.setLoggedUserData({ loggedUser: result });
      }
    })
  }

  logout() {
    this.authService.markUserAsLoggedOut();
    this.router.navigateByUrl("/login");
    localStorage.clear();
  }

  navigateTo(url: string, event: any): void {
    this.router.navigateByUrl("/" + url);

    document.querySelector(".active")?.classList.toggle("active");

    event.target.classList.toggle('active');
  }
}
