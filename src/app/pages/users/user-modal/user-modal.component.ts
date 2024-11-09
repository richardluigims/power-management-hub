import { Component } from '@angular/core';
import { UserModalControlService } from './user-modal-control.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { LoggedUserDataControlService } from '../../../services/users/logged-user-data-control.service';
import { User } from '../../../interfaces/user';
import { Subscription } from 'rxjs';
import { UserModalData } from '../../../interfaces/user-modal-data';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {
  modalElement: HTMLDialogElement | null = null;
  userForm: any;
  modalControlSubscription: Subscription | null = null;
  isActive: boolean = false;
  userToEdit: User | null = null;
  editModeEnabled: boolean = false;

  constructor(
    private userModalControl: UserModalControlService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private userDataService: LoggedUserDataControlService
  ) {}

  ngOnInit(): void {
    this.modalControlSubscription = this.userModalControl.getUserModalControl().subscribe((userModalData: UserModalData) => {
      this.isActive = userModalData.isActive;
      this.userToEdit = userModalData.user || null;

      this.isActive ?
        this.modalElement?.showModal() :
        this.modalElement?.close();

      if (this.userToEdit) {
        this.enableEditMode();
      }
    })

    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      accessWord: [null, Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.modalElement = document.querySelector("#modal-novo-usuario");
  }

  enableEditMode(): void {
    this.editModeEnabled = true;

    this.userForm.setValue({
      name: this.userToEdit?.name,
      accessWord: this.userToEdit?.accessWord
    })
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }

    let newUser = {
      name: this.userForm.get('name').value,
      accessWord: this.userForm.get('accessWord').value      
    }

    this.usersService.createUser(newUser).then((response) => {
      let newUsers = [
        ...(this.userDataService.getLoggedUserData().users) ?? [],
        response
      ];

      this.userDataService.setLoggedUserData({
        users: newUsers
      });

      this.closeModal();
    })
  }

  editUser() {
    if (this.userForm.invalid) {
      return;
    }

    let user = {
      id: this.userToEdit?.id,
      name: this.userForm.get('name').value,
      accessWord: this.userForm.get('accessWord').value
    }

    this.usersService.editUser(user).then((response) => {
      let registeredUsers = this.userDataService.getLoggedUserData().users;
      let updatedUsers = registeredUsers?.map(user => user.id === user.id ? response : user);

      this.userDataService.setLoggedUserData({
        users: updatedUsers
      });
    })
  }

  onModalClose() {
    this.userForm.reset();
  }

  closeModal() {
    this.userModalControl.closeUserModal();
  }
}
