import { NgModule } from '@angular/core';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeatureGroupComponent } from './feature-group/feature-group.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from './menus/menu.component';
import { SelectComponent } from './select/select.component';
import { InfoComponent } from './info/info.component';
import { StakeholderComponent } from './stakeholder/stakeholder.component';
import { StakeholderselectComponent } from './stakeholderselect/stakeholderselect.component';
import { ColorSelectComponent } from './colorSelect/color-select.component';
import { AboutComponent } from './about/about.component';
import { MethodComponent } from './method/method.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanitizeHtmlPipe } from '../sanitize-html.pipe'; // Import the pipe here
import { ColorSchemeService } from '../color-scheme.service';
import { CombinationViewComponent } from './combination-view/combination-view.component'; // Import your service here


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'et',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule
  ],
  providers: [ColorSchemeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}

  changeColorScheme(scheme: string) {
    // Your color scheme toggle logic here
  }
}
