import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component.js';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component.js';
import { AboutComponent } from './about/about.component.js';
import { MethodComponent } from './method/method.component.js';
const validationRoutes = [
    {
        path: 'validation',
        component: HomepageComponent,
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
        component: QuestionnaireComponent,
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
        component: MethodComponent,
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
        component: AboutComponent,
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
AppRoutingModule = __decorate([
    NgModule({
        imports: [BrowserModule,
            RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
        ],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map