import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGuest } from './navigation-guest';

describe('NavigationGuest', () => {
  let component: NavigationGuest;
  let fixture: ComponentFixture<NavigationGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
