import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaTableSectionOrganism } from './ba-table-section.organism';

describe('BaTableSectionOrganism', () => {
  let component: BaTableSectionOrganism;
  let fixture: ComponentFixture<BaTableSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaTableSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaTableSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
