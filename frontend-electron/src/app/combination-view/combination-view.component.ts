import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../validation/service/validation.service';
import { ValidationCombinationResult } from '../validation/model/validation-combination-result';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-combination-view',
  templateUrl: './combination-view.component.html',
  styleUrls: ['./combination-view.component.css']
})
export class CombinationViewComponent implements OnInit{

  validationCombinationResults: ValidationCombinationResult[] = [];
  headers: string[] = [];
  constructor(
    private validationService: ValidationService,
    private translateService: TranslateService
  ) {
    this.onLanguageChanged();
  }

  ngOnInit(): void {
    this.validationService.getValidationCombinationResults().subscribe((next) => {
      this.validationCombinationResults = next
      this.mapResourcesForTableView(this.validationCombinationResults);
    });
  }

  mapResourcesForTableView(results: ValidationCombinationResult[]): void {
    this.headers = [];
    if (results.length > 0) {
      for (let combinationTitle of results[0].validationCombinations) {
        if (this.translateService.currentLang === GlobalConstants.ET) {
          this.headers.push(combinationTitle.validationResponse.nameEt);

          continue;
        }
        this.headers.push(combinationTitle.validationResponse.nameEn);
      }
    }
  }

  onLanguageChanged() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.mapResourcesForTableView(this.validationCombinationResults);
    });
  }

  getValidationCombinationResultValueTranslationKey(validationCombinationResult: ValidationCombinationResult): string {
    if (this.translateService.currentLang === GlobalConstants.ET) {
      return validationCombinationResult.resultEt;
    }
    return validationCombinationResult.resultEn;
  }
}
