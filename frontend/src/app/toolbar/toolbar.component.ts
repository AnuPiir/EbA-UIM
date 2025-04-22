import {Component, EventEmitter, Output, Renderer2} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuestionnaireService } from '../questionnaire/service/questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { PreferenceService } from '../services/preference.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent{
  @Output() colorSchemeChanged = new EventEmitter<string>();

  languages = ['ET', 'EN']
  questionnaireName: string | null;
  isAccessibilityPanelOpen: boolean = false;
  // Current color scheme and text size
  currentColorScheme: string = 'scheme1';
  textSize: string = 'medium';


  constructor(
    private translate: TranslateService,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private pref: PreferenceService,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['questionnaireId']) {
        this.questionnaireService.getQuestionnaire(params['questionnaireId']).subscribe( next => this.questionnaireName = next.name)
      } else {
        this.questionnaireName = null;
      }
    });
  }

  questionnairePath = "/questionnaire"
  method = "/method"
  about = "/about"
  validationPath = "/validation"

  get currentLang(): string {
    return (this.translate.currentLang || 'et').toUpperCase();
  }

  setLang(language: string): void {
    const code = language.toLowerCase();
    this.translate.use(code).subscribe(() => {
      this.pref.setPreference('LANGUAGE', code)
          .subscribe({
            next: () => {},
            error: e => console.error('Could not save lang:', e)
          });
      localStorage.setItem('user-language', code);
    });
  }

  isLanguageSelected(language: string): boolean {
    return this.currentLang === language;
  }

  toggleAccessibilityPanel() {
    this.isAccessibilityPanelOpen = !this.isAccessibilityPanelOpen;
  }

  closeAccessibilityPanel() {
    this.isAccessibilityPanelOpen = false;
  }

  /*currentColorScheme: string = 'scheme1';
  toggleColorScheme() {
    this.currentColorScheme = this.currentColorScheme === 'scheme1' ? 'scheme2' : 'scheme1';
  }*/

  setColorScheme(scheme: string) {
    this.colorSchemeChanged.emit(scheme);
  }

  changeTextSize(size: string) {
    this.textSize = size;
    switch (size) {
      case 'small':
        document.body.style.fontSize = '12px';
        break;
      case 'medium':
        document.body.style.fontSize = '16px';
        break;
      case 'large':
        document.body.style.fontSize = '20px';
        break;
    }

    this.pref.setPreference('textSize', size).subscribe({
      next: () => {},
      error: e => console.error('Could not save text size:', e)
    });
  }
}
