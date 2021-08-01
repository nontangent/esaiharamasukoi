import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DdImageInputModule } from './_shared/components/extra';
import { SnackBarModule } from './_shared/services';
import { TeamModule } from './_shared/components/templates';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule, 
    DdImageInputModule,
    SnackBarModule,
    // Templates
    TeamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
