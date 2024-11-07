import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users/users.service';
import { UserModalControlService } from '../../../users/user-modal/user-modal-control.service';
import { LoggedUserDataControlService } from '../../../../services/users/logged-user-data-control.service';
import { Subscription } from 'rxjs';
import { UserModalData } from '../../../../interfaces/user-modal-data';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-modal-novo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-novo-usuario.component.html',
  styleUrl: './modal-novo-usuario.component.scss'
})
export class ModalNovoUsuarioComponent implements OnInit, AfterViewInit {
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
      let usuariosRegistrados = [
        ...this.userDataService.getLoggedUserData().usuarios,
        response
      ];

      this.userDataService.setLoggedUserData({
        usuarios: usuariosRegistrados
      });

      this.closeModal();
    })
  }

  onClose() {
    this.novoUsuarioForm.reset();
  }

  closeModal() {
    this.modalControlService.toggleModalNovoUsuario();
  }
}
