import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PresenceService } from './core/realtime/presence.service';
import { CrmEventsService } from './core/realtime/crm-events.service';
import * as i0 from "@angular/core";
export class App {
    presenceService = inject(PresenceService);
    crmEventsService = inject(CrmEventsService);
    constructor() {
        this.presenceService.connect();
        this.crmEventsService.connect();
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet");
        } }, dependencies: [RouterOutlet], styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [RouterOutlet], template: "<router-outlet />\n", styles: [":host {\n  display: block;\n  height: 100%;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 13 }); })();
