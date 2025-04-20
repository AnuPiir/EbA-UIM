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
    //translate.setDefaultLang('et');
    //translate.use('et');

  }

  ngOnInit() {
    this.http.get<Preference[]>('/api/preference')
        .subscribe({
          next: prefs => {
            const lang = prefs.find(p => p.type === 'LANGUAGE')?.value ?? 'et';
            this.translate.setDefaultLang(lang);
            this.translate.use(lang);
          },
          error: err => {
            console.error('Failed to fetch preferences', err);
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
