import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface MenuItem {
  id: string;
  label: string;
  color?: string;
}

@Component({
  selector: 'kurakatsu-menu',
  templateUrl: './menu.sheet.html',
  styleUrls: ['./menu.sheet.scss']
})
export class MenuSheet {
  constructor(
    private sheetRef: MatBottomSheetRef<MenuSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public items: MenuItem[]
  ) { }

  @Output()
  itemClick = new EventEmitter<MenuItem>();

  onItemClick(item: MenuItem): void {
    this.sheetRef.dismiss(item);
  }
}
