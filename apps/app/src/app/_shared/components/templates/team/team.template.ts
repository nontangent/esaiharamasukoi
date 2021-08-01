import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'templates-team',
  templateUrl: './team.template.html',
  styleUrls: ['./team.template.scss']
})
export class TeamTemplate {
  @Output()
  doneButtonClick = new EventEmitter();

  @Output()
  beforeFileSelected = new EventEmitter();

  @Output()
  afterFileSelected = new EventEmitter();
}
