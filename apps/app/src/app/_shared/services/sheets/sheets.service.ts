import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MenuItem, MenuSheet } from './sheets/menu/menu.sheet';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  openMenuSheet(items: MenuItem[]) {
    return this.bottomSheet.open(MenuSheet, {data: items});
  }
}
