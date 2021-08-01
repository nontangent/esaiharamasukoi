import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTemplate } from './team.template';

describe('TeamTemplate', () => {
  let component: TeamTemplate;
  let fixture: ComponentFixture<TeamTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
