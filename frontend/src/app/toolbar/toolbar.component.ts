import { Component } from '@angular/core';
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

  languages = ['ET', 'EN']
  questionnaireName: string | null;

  constructor(
    private translate: TranslateService,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private preference: PreferenceService,
    private http: HttpClient
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
    return this.translate.currentLang ? this.translate.currentLang.toUpperCase() : 'ET';
  }


  savePreference(language: string) {
    this.http.post(`/api/preference/type/LANGUAGE/value/${language}`, {}).subscribe(
        () => {},
        error => {
          console.error('Failed to save preference', error);
        }
    );
  }

  setLang(language: string): void {
    this.translate.use(language.toLowerCase());
    this.savePreference(language.toLowerCase());

  }

  isLanguageSelected(language: string): boolean {
    return this.currentLang == language;
  }
}
