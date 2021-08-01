import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSheet } from './menu.sheet';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MenuSheet
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    MenuSheet
  ]
})
export class MenuModule { }
