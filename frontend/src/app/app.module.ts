import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ValidationComponent } from './validation/validation.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './questionnaire/modal/delete-modal/delete-modal.component';
import { EditModalComponent } from './questionnaire/modal/edit-modal/edit-modal.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeatureGroupComponent } from './feature-group/feature-group.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MenuComponent } from './menus/menu.component';
import { SelectComponent } from './select/select.component';
import { InfoComponent } from './info/info.component';
import { StakeholderComponent } from './stakeholder/stakeholder.component';
import { StakeholderselectComponent } from './stakeholderselect/stakeholderselect.component';
import { ColorSelectComponent } from './colorSelect/color-select.component';
import { AboutComponent } from './about/about.component';
import { MethodComponent } from './method/method.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanitizeHtmlPipe } from '../sanitize-html.pipe';
import { ColorSchemeService } from '../color-scheme.service';
import { CombinationViewComponent } from './combination-view/combination-view.component';
import { NotificationComponent } from './notification/notification.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import {NoSituationModalComponent} from "./questionnaire/modal/no-situation-modal/no-situation-modal.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { PreferenceService } from './services/preference.service';
import {firstValueFrom} from "rxjs";
import {TruncatePipe} from "./utils/truncate.pipe";


export function HttpLoaderFactory(http: HttpClient) {
  const isElectron = (window as any).process && (window as any).process.type;
  const basePath = isElectron ? `./assets/i18n/` : `/assets/i18n/`;
  return new TranslateHttpLoader(http, basePath, ".json");
}

export function initAppFactory(
    pref: PreferenceService,
    translate: TranslateService
) {
  return async () => {
    let lang = 'et';
    try {
      const prefs = await firstValueFrom(pref.getPreferences());
      const backendLang = prefs.find(p => p.type === 'LANGUAGE')?.value;
      if (backendLang) {
        lang = backendLang;
      }
    } catch {
      const stored = localStorage.getItem('user-language');
      if (stored) {
        lang = stored;
      }
    }
    translate.setDefaultLang(lang);
    await firstValueFrom(translate.use(lang));
    console.log(`App language initialized to: ${lang}`);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ValidationComponent,
    ToolbarComponent,
    QuestionnaireComponent,
    DeleteModalComponent,
    FeatureGroupComponent,
    EditModalComponent,
    MenuComponent,
    SelectComponent,
    InfoComponent,
    StakeholderComponent,
    StakeholderselectComponent,
    ColorSelectComponent,
    AboutComponent,
    MethodComponent,
    SanitizeHtmlPipe,
    CombinationViewComponent,
    BackToTopComponent,
    NoSituationModalComponent,
    NotificationComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    TextFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatMenuModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [PreferenceService, TranslateService],
      multi: true
    },
      ColorSchemeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}

  changeColorScheme(scheme: string) {
    // Your color scheme toggle logic here
  }
}
