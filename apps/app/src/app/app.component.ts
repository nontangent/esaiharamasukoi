import { Component, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$ = this.app.loading.isLoading$.pipe(startWith(false));
  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.app.auth.initialize();
  }
}
