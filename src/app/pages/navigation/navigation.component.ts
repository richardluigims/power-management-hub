import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared-components/header/header.component";
import { UserDataService } from '../../services/users/user-data.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  userId: string | null = null;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.getUser();
  }

  getUser() {
    if (this.userId != null) {
      this.usersService.getUser(this.userId).then((result) => {
        if (result != null) {
          this.userDataService.setLoggedUserData({ loggedUser: result });
        }
      })
    } 
  }
}
