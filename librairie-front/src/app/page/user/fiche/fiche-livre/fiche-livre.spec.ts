import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheLivre } from './fiche-livre';

describe('FicheLivre', () => {
  let component: FicheLivre;
  let fixture: ComponentFixture<FicheLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheLivre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheLivre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
