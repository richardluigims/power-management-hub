import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoUsuarioComponent } from './modal-novo-usuario.component';

describe('ModalNovoUsuarioComponent', () => {
  let component: ModalNovoUsuarioComponent;
  let fixture: ComponentFixture<ModalNovoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNovoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNovoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
