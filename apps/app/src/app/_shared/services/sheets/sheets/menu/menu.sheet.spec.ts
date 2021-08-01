import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSheet } from './menu.sheet';

describe('MenuSheet', () => {
  let component: MenuSheet;
  let fixture: ComponentFixture<MenuSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSheet ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
