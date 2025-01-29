"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeHtmlPipe = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let SanitizeHtmlPipe = class SanitizeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
};
SanitizeHtmlPipe = tslib_1.__decorate([
    (0, core_1.Pipe)({
        name: 'sanitizeHtml'
    })
], SanitizeHtmlPipe);
exports.SanitizeHtmlPipe = SanitizeHtmlPipe;
//# sourceMappingURL=sanitize-html.pipe.js.map