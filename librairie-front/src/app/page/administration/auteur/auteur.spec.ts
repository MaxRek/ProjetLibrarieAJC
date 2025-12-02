import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auteur } from './auteur';

describe('Auteur', () => {
  let component: Auteur;
  let fixture: ComponentFixture<Auteur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auteur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auteur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
