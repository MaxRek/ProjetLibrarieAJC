import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviUser } from './suivi';

describe('SuiviUser', () => {
  let component: SuiviUser;
  let fixture: ComponentFixture<SuiviUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
