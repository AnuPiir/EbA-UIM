import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component.js';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component.js';
import { ValidationComponent } from './validation/validation.component.js';
import { AppRoutingModule } from './app-routing.module.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { ToolbarComponent } from './toolbar/toolbar.component.js';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component.js';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './questionnaire/modal/delete-modal/delete-modal.component.js';
import { EditModalComponent } from './questionnaire/modal/edit-modal/edit-modal.component.js';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeatureGroupComponent } from './feature-group/feature-group.component.js';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from './menus/menu.component.js';
import { SelectComponent } from './select/select.component.js';
import { InfoComponent } from './info/info.component.js';
import { StakeholderComponent } from './stakeholder/stakeholder.component.js';
import { StakeholderselectComponent } from './stakeholderselect/stakeholderselect.component.js';
import { ColorSelectComponent } from './colorSelect/color-select.component.js';
import { AboutComponent } from './about/about.component.js';
import { MethodComponent } from './method/method.component.js';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanitizeHtmlPipe } from '../sanitize-html.pipe.js'; // Import the pipe here
import { ColorSchemeService } from '../color-scheme.service.js';
import { CombinationViewComponent } from './combination-view/combination-view.component.js'; // Import your service here
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
let AppModule = class AppModule {
    constructor() { }
    changeColorScheme(scheme) {
        // Your color scheme toggle logic here
    }
};
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map