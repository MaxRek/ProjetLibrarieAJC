import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatUser } from './achat';

describe('AchatUser', () => {
  let component: AchatUser;
  let fixture: ComponentFixture<AchatUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchatUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchatUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
