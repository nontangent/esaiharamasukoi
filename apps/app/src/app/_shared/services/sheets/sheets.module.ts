import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MenuModule } from './sheets';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MenuModule,
  ]
})
export class SheetsModule { }
