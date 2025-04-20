import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpClientModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, private http: HttpClient) {
    //translate.setDefaultLang('et');
    //translate.use('et');
  }

  ngOnInit() {
    this.fetchPreferences();
  }

  fetchPreferences() {
    this.http.get<{ type: string, value: string }[]>('/api/preference').subscribe(preferences => {
      const languagePreference = preferences.find(p => p.type === 'LANGUAGE');
      if (languagePreference) {
        this.translate.use(languagePreference.value);
      } else {
        this.translate.setDefaultLang('et');
        this.translate.use('et');
      }
    });
  }

  currentColorScheme: string = 'scheme1';

  toggleColorScheme() {
    this.currentColorScheme = this.currentColorScheme === 'scheme1' ? 'scheme2' : 'scheme1';
  }
}
