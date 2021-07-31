import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdImageInputComponent } from './dd-image-input.component';

describe('DdImageInputComponent', () => {
  let component: DdImageInputComponent;
  let fixture: ComponentFixture<DdImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdImageInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
