import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DdImageInputModule } from '../../extra';
import { BaTableSectionOrganism } from './ba-table-section.organism';

@NgModule({
  declarations: [
    BaTableSectionOrganism
  ],
  imports: [
    CommonModule,
    // Material
    MatTableModule,
    // Extra
    DdImageInputModule,
  ],
  exports: [
    BaTableSectionOrganism
  ]
})
export class BaTableSectionModule { }
