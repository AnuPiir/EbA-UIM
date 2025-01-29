import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let SanitizeHtmlPipe = class SanitizeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
};
SanitizeHtmlPipe = __decorate([
    Pipe({
        name: 'sanitizeHtml'
    })
], SanitizeHtmlPipe);
export { SanitizeHtmlPipe };
//# sourceMappingURL=sanitize-html.pipe.js.map