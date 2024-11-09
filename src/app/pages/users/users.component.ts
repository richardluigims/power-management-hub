import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { LoggedUserDataControlService } from '../../services/users/logged-user-data-control.service';
import { UsersService } from '../../services/users/users.service';
import { UserModalControlService } from './user-modal/user-modal-control.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  loggedUserData: any;
  users = new Array<User>();
  loggedUser: User | null = null;
  userDataSubscription: Subscription | null = null;
  selectedUserIds = new Array<string>();
  showSelectOptions: boolean = false;

  constructor(
    private userDataService: LoggedUserDataControlService,
    private usersService: UsersService,
    private modalControl: UserModalControlService
  ) { }

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.users = data.users || [];
      this.loggedUser = data.loggedUser || null;

      if (this.users.length > 0) {
        this.users.sort((a: any, b: any) => {
          if (a.id == this.loggedUser?.id)
            return -1;
  
          if (b.id == this.loggedUser?.id)
            return 1;
  
          return 0;
        })
      }
      else {
        this.getUsers();
      }
    });
  }

  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }

  getUsers() {
    this.usersService.getAllUsers().then((result) => {
      this.users = result;

      this.userDataService.setLoggedUserData({ users: this.users });
    })
  }

  showUserModal() {
    this.modalControl.openUserModal();
  }

  toggleSelectOptions() {
    this.showSelectOptions = !this.showSelectOptions;

    document.querySelector("#usuarios-container")?.classList.toggle('show-select-options');

    if (!this.showSelectOptions) {
      this.selectedUserIds = new Array<any>();

      document.querySelectorAll(".checkbox-input").forEach((checkboxInput: any) => {
        checkboxInput.checked = false;
      })
    }
  }

  onUserSelected(event: any) {
    let userId = event.target.value;
    let index = this.selectedUserIds.indexOf(userId);

    (index > -1) ?
      this.selectedUserIds.splice(index, 1) :
      this.selectedUserIds.push(userId);
  }
  
  deleteUsers() {
    if (this.selectedUserIds.length == 0) {
      return;
    }

    this.usersService.deleteUsers(this.selectedUserIds).then((response) => {      
      let newUsers = this.users.filter(user => !this.selectedUserIds.includes(user.id!));

      this.userDataService.setLoggedUserData({ users: newUsers });
      this.toggleSelectOptions();
    });
  }
}
