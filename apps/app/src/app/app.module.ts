import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DdImageInputModule } from './_shared/components/extra';
import { 
  TopNavigatorModule,
  BaTableSectionModule,
} from './_shared/components/organisms';
import { SnackBarModule } from './_shared/services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule, 
    DdImageInputModule, 
    TopNavigatorModule,
    BaTableSectionModule,
    SnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
