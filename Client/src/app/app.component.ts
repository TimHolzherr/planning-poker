import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <div style="text-align:center; width: 50%; margin: 0 auto;">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class AppComponent {}
