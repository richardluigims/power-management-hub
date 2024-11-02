import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserDataService } from '../../services/usuarios/user-data.service';
import { Subscription } from 'rxjs';
import { ModalNovoAparelhoControlService } from '../../pages/aparelhos/components/modal-novo-aparelho/modal-novo-aparelho-control.service';

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
  userDataSubscription: Subscription | null = null;;
  
  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private modalNovoAparelho: ModalNovoAparelhoControlService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.loggedUser = data.loggedUser;
    })

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url == "/login") {
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
      this.userDataSubscription?.unsubscribe();
      this.routerSubscription?.unsubscribe();
  }

  mostrarModalNovoAparelho() {
    this.modalNovoAparelho.toggleModalNovoAparelho();
  }

  logout() {
    this.router.navigateByUrl("/login");
  }

  navigateTo(url: string, event: any): void {
    this.router.navigateByUrl("/" + url);

    document.querySelector(".active")?.classList.toggle("active");
    event.target.classList.toggle('active');
  }
}
