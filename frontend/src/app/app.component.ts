import {Component} from '@angular/core';
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

  applyColorScheme(scheme: string) {
    this.currentColorScheme = scheme;
    document.body.classList.remove('scheme1', 'high-contrast');
    document.body.classList.add(scheme);
  }

  // Method to toggle between color schemes
  toggleColorScheme() {
    const newScheme = this.currentColorScheme === 'scheme1' ? 'scheme2' : 'scheme1';
    this.applyColorScheme(newScheme);
  }
}
