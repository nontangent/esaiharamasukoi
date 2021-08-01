import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamTemplate } from './team.template';

import { 
  TopNavigatorModule,
  BaTableSectionModule,
} from '../../organisms';

@NgModule({
  declarations: [
    TeamTemplate
  ],
  imports: [
    CommonModule,
    TopNavigatorModule,
    BaTableSectionModule,
  ],
  exports: [
    TeamTemplate
  ]
})
export class TeamModule { }
