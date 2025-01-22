"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
exports.HttpLoaderFactory = HttpLoaderFactory;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var homepage_component_1 = require("./homepage/homepage.component");
var validation_component_1 = require("./validation/validation.component");
var app_routing_module_1 = require("./app-routing.module");
var animations_1 = require("@angular/platform-browser/animations");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var select_1 = require("@angular/material/select");
var text_field_1 = require("@angular/cdk/text-field");
var input_1 = require("@angular/material/input");
var toolbar_component_1 = require("./toolbar/toolbar.component");
var toolbar_1 = require("@angular/material/toolbar");
var questionnaire_component_1 = require("./questionnaire/questionnaire.component");
var modal_1 = require("ngx-bootstrap/modal");
var delete_modal_component_1 = require("./questionnaire/modal/delete-modal/delete-modal.component");
var edit_modal_component_1 = require("./questionnaire/modal/edit-modal/edit-modal.component");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var feature_group_component_1 = require("./feature-group/feature-group.component");
var expansion_1 = require("@angular/material/expansion");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var tabs_1 = require("@angular/material/tabs");
var menu_component_1 = require("./menus/menu.component");
var select_component_1 = require("./select/select.component");
var info_component_1 = require("./info/info.component");
var stakeholder_component_1 = require("./stakeholder/stakeholder.component");
var stakeholderselect_component_1 = require("./stakeholderselect/stakeholderselect.component");
var color_select_component_1 = require("./colorSelect/color-select.component");
var about_component_1 = require("./about/about.component");
var method_component_1 = require("./method/method.component");
var tooltip_1 = require("@angular/material/tooltip");
var sanitize_html_pipe_1 = require("../sanitize-html.pipe"); // Import the pipe here
var color_scheme_service_1 = require("../color-scheme.service");
var combination_view_component_1 = require("./combination-view/combination-view.component"); // Import your service here
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
var AppModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
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
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        AppModule_1.prototype.changeColorScheme = function (scheme) {
            // Your color scheme toggle logic here
        };
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map