import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationUser } from './navigation-user';

describe('NavigationUser', () => {
  let component: NavigationUser;
  let fixture: ComponentFixture<NavigationUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
