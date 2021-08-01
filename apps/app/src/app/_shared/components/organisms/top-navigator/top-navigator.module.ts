import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigatorOrganism } from './top-navigator.organism';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    TopNavigatorOrganism
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    TopNavigatorOrganism
  ]
})
export class TopNavigatorModule { }
