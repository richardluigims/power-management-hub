import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.watchingUserLogState().subscribe((userLogState) => {
      console.log("entrei no subscribe");
      this.isUserLoggedIn = userLogState;
      console.log(this.isUserLoggedIn);
      this.changeDetectorRef.detectChanges();
    })
  }
}
