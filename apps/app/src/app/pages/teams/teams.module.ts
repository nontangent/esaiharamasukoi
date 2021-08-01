import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsPage } from './teams.page';
import { TeamModule } from '../../_shared/components/templates';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TeamsPage
  },
  {
    path: ':teamId',
    component: TeamsPage
  },
];

@NgModule({
  declarations: [
    TeamsPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // Templates
    TeamModule,
  ]
})
export class TeamsModule { }
