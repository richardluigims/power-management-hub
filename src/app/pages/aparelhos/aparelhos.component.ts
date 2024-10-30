import { Component, OnDestroy, OnInit } from '@angular/core';
import { AparelhosService } from '../../services/aparelhos/aparelhos.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CardAparelhoComponent } from './components/card-aparelho/card-aparelho.component';
import { UserDataService } from '../../services/usuarios/user-data.service';
import { Subscription } from 'rxjs';

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

  aparelhos: any[] = [];
  userDataSubscription: Subscription | null = null;
  aparelhosSelecionados = new Array<any>();

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

    this.userDataSubscription = this.userDataService.watchLoggedUserData().subscribe((data) => {
      this.aparelhos = data.aparelhos;
    });
    
    if (this.aparelhos.length == 0) {
      this.getAparelhos();
    }
  }

  ngOnDestroy(): void {
      this.userDataSubscription?.unsubscribe();
  }

  getAparelhos() {
    this.aparelhosService.getAparelhos().then((result) => {
      this.aparelhos = result;
      this.userDataService.setLoggedUserData({ aparelhos: this.aparelhos});
    })
  }

  onSelectAparelho(aparelhoId: any) {
    let index = this.aparelhosSelecionados.indexOf(aparelhoId);
    
    (index > -1) ?
      this.aparelhosSelecionados.splice(index, 1) :
      this.aparelhosSelecionados.push(aparelhoId);

    this.toggleExcluirButtton();
  }

  excluirAparelhos() {
    if (this.aparelhosSelecionados.length == 0) {
      return;
    }

    this.aparelhosService.deleteAparelhos(this.aparelhosSelecionados).then(() => {
      let novosAparelhos = this.aparelhos.filter(aparelho => !this.aparelhosSelecionados.includes(aparelho.id));

      this.userDataService.setLoggedUserData({ aparelhos: novosAparelhos });
      this.aparelhosSelecionados = new Array<any>();
      this.toggleExcluirButtton();
    });
  }

  toggleExcluirButtton() {
    let buttonExcluir = document.querySelector("#btn_excluir-aparelhos");
    buttonExcluir?.classList.toggle('show', this.aparelhosSelecionados.length > 0);
  }
}
