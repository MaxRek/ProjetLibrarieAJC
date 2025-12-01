import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papeterie } from './papeterie';

describe('Papeterie', () => {
  let component: Papeterie;
  let fixture: ComponentFixture<Papeterie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Papeterie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Papeterie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
