import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'organisms-ba-table-section',
  templateUrl: './ba-table-section.organism.html',
  styleUrls: ['./ba-table-section.organism.scss']
})
export class BaTableSectionOrganism {
  @Output()
  beforeFileSelected = new EventEmitter<File>();

  @Output()
  afterFileSelected = new EventEmitter<File>();
}
