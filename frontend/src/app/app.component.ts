import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';


interface Preference { type: string; value: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpClientModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, private http: HttpClient) {
  }

  currentColorScheme: string = 'scheme1';


  toggleColorScheme() {
    this.currentColorScheme = this.currentColorScheme === 'scheme1' ? 'scheme2' : 'scheme1';
  }

  focusMainContent(event: Event) {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }

}
