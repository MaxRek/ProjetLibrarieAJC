import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePapeterie } from './fiche-papeterie';

describe('FichePapeterie', () => {
  let component: FichePapeterie;
  let fixture: ComponentFixture<FichePapeterie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichePapeterie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichePapeterie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
