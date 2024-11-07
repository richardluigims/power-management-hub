import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeviceModalControlService } from '../../pages/devices/components/device-modal/device-modal-control.service';
import { LoggedUserDataControlService } from '../../services/users/logged-user-data-control.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  loggedUser: User | null = null;
  routerSubscription: Subscription | null = null;
  userDataSubscription: Subscription | null = null;;
  
  constructor(
    private router: Router,
    private userDataService: LoggedUserDataControlService,
    private deviceModalControl: DeviceModalControlService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.loggedUser = data.loggedUser ? data.loggedUser : null;
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

  showDeviceModal() {
    this.deviceModalControl.openDeviceModal();
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
