import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HeaderComponent } from "./shared-components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  
  isUserLoggedIn: boolean = false;
  userLogObservable: any;

  constructor(
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogObservable = this.authService.watchingUserLogState().subscribe((userLogState) => {
      this.isUserLoggedIn = userLogState;
      this.changeDetectorRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.userLogObservable.unsubscribe();
  }
}
