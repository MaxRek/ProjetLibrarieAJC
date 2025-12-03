import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierUser } from './panier';

describe('PanierUser', () => {
  let component: PanierUser;
  let fixture: ComponentFixture<PanierUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
