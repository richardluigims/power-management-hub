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

    let newUserAccessWord = this.userForm.get('accessWord').value;
    let registeredUsers = this.userDataService.getLoggedUserData().users;
    let userAlreadyRegistered = registeredUsers?.findIndex(user => user.accessWord == newUserAccessWord);

    if (userAlreadyRegistered != -1) {
      alert("Já existe um usuário com essa palavra-passe.");
      return;
    }

    let newUser = {
      name: this.userForm.get('name').value,
      accessWord: newUserAccessWord
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

    let editedUser = {
      id: this.userToEdit?.id,
      name: this.userForm.get('name').value,
      accessWord: this.userForm.get('accessWord').value
    }

    this.usersService.editUser(editedUser).then((response) => {
      let registeredUsers = this.userDataService.getLoggedUserData().users;
      let editedUserIndex = registeredUsers!.findIndex((user: User) => user.id === editedUser.id)
      registeredUsers![editedUserIndex] = response;

      this.userDataService.setLoggedUserData({
        users: registeredUsers
      });

      this.closeModal();
    })
  }

  onModalClose() {
    this.userForm.reset();
  }

  closeModal() {
    this.userModalControl.closeUserModal();

    this.editModeEnabled = false;
  }
}
