"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const homepage_component_1 = require("./homepage/homepage.component");
const questionnaire_component_1 = require("./questionnaire/questionnaire.component");
const about_component_1 = require("./about/about.component");
const method_component_1 = require("./method/method.component");
const validationRoutes = [
    {
        path: 'validation',
        component: homepage_component_1.HomepageComponent,
        data: {
            meta: {
                title: {
                    value: 'nontranslatedpagemeta'
                }
            }
        }
    },
    {
        path: 'questionnaire',
        component: questionnaire_component_1.QuestionnaireComponent,
        data: {
            meta: {
                title: {
                    value: 'nontranslatedpagemeta'
                }
            }
        }
    },
    {
        path: 'method',
        component: method_component_1.MethodComponent,
        data: {
            meta: {
                title: {
                    value: 'nontranslatedpagemeta'
                }
            }
        }
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent,
        data: {
            meta: {
                title: {
                    value: 'nontranslatedpagemeta'
                }
            }
        }
    },
];
const routes = [
    { path: '', redirectTo: 'questionnaire', pathMatch: 'full' },
    ...validationRoutes,
    { path: '**', pathMatch: 'full', redirectTo: 'questionnaire' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
        ],
        exports: [router_1.RouterModule],
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map