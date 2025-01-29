"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.HttpLoaderFactory = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const homepage_component_1 = require("./homepage/homepage.component");
const validation_component_1 = require("./validation/validation.component");
const app_routing_module_1 = require("./app-routing.module");
const animations_1 = require("@angular/platform-browser/animations");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const select_1 = require("@angular/material/select");
const text_field_1 = require("@angular/cdk/text-field");
const input_1 = require("@angular/material/input");
const toolbar_component_1 = require("./toolbar/toolbar.component");
const toolbar_1 = require("@angular/material/toolbar");
const questionnaire_component_1 = require("./questionnaire/questionnaire.component");
const modal_1 = require("ngx-bootstrap/modal");
const delete_modal_component_1 = require("./questionnaire/modal/delete-modal/delete-modal.component");
const edit_modal_component_1 = require("./questionnaire/modal/edit-modal/edit-modal.component");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
const feature_group_component_1 = require("./feature-group/feature-group.component");
const expansion_1 = require("@angular/material/expansion");
const icon_1 = require("@angular/material/icon");
const button_1 = require("@angular/material/button");
const tabs_1 = require("@angular/material/tabs");
const menu_component_1 = require("./menus/menu.component");
const select_component_1 = require("./select/select.component");
const info_component_1 = require("./info/info.component");
const stakeholder_component_1 = require("./stakeholder/stakeholder.component");
const stakeholderselect_component_1 = require("./stakeholderselect/stakeholderselect.component");
const color_select_component_1 = require("./colorSelect/color-select.component");
const about_component_1 = require("./about/about.component");
const method_component_1 = require("./method/method.component");
const tooltip_1 = require("@angular/material/tooltip");
const sanitize_html_pipe_1 = require("../sanitize-html.pipe"); // Import the pipe here
const color_scheme_service_1 = require("../color-scheme.service");
const combination_view_component_1 = require("./combination-view/combination-view.component"); // Import your service here
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
let AppModule = class AppModule {
    constructor() { }
    changeColorScheme(scheme) {
        // Your color scheme toggle logic here
    }
};
AppModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            homepage_component_1.HomepageComponent,
            validation_component_1.ValidationComponent,
            toolbar_component_1.ToolbarComponent,
            questionnaire_component_1.QuestionnaireComponent,
            delete_modal_component_1.DeleteModalComponent,
            feature_group_component_1.FeatureGroupComponent,
            edit_modal_component_1.EditModalComponent,
            menu_component_1.MenuComponent,
            select_component_1.SelectComponent,
            info_component_1.InfoComponent,
            stakeholder_component_1.StakeholderComponent,
            stakeholderselect_component_1.StakeholderselectComponent,
            color_select_component_1.ColorSelectComponent,
            about_component_1.AboutComponent,
            method_component_1.MethodComponent,
            sanitize_html_pipe_1.SanitizeHtmlPipe,
            combination_view_component_1.CombinationViewComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            progress_spinner_1.MatProgressSpinnerModule,
            select_1.MatSelectModule,
            animations_1.BrowserAnimationsModule,
            text_field_1.TextFieldModule,
            input_1.MatInputModule,
            toolbar_1.MatToolbarModule,
            expansion_1.MatExpansionModule,
            icon_1.MatIconModule,
            button_1.MatButtonModule,
            tabs_1.MatTabsModule,
            tooltip_1.MatTooltipModule,
            modal_1.ModalModule.forRoot(),
            core_2.TranslateModule.forRoot({
                defaultLanguage: 'et',
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_1.HttpClient]
                }
            }),
            platform_browser_1.BrowserModule
        ],
        providers: [color_scheme_service_1.ColorSchemeService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map