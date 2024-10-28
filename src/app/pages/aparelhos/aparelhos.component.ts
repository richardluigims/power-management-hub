import { Component, OnDestroy, OnInit } from '@angular/core';
import { AparelhosService } from '../../services/aparelhos/aparelhos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CardAparelhoComponent } from './components/card-aparelho/card-aparelho.component';
import { UserDataService } from '../../services/usuarios/user-data.service';

@Component({
  selector: 'app-aparelhos',
  standalone: true,
  imports: [
    CardAparelhoComponent
  ],
  templateUrl: './aparelhos.component.html',
  styleUrl: './aparelhos.component.scss'
})
export class AparelhosComponent implements OnInit, OnDestroy {

  aparelhos: any = null;
  userDataSubscription: any;

  constructor(
    private aparelhosService: AparelhosService,
    private userDataService: UserDataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.markUserAsLoggedIn();
    }

    this.userDataSubscription = this.userDataService.getLoggedUserData().subscribe((data) => {
      this.aparelhos = data.aparelhos;
    });
    
    if (this.aparelhos == null) {
      this.getAparelhos();
    }
  }

  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe();
  }

  getAparelhos() {
    this.aparelhosService.getAparelhos().then((result) => {
      this.aparelhos = result;

      this.userDataService.setLoggedUserData({ aparelhos: this.aparelhos});
    })
  }
}
