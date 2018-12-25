import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <div class="container fill-page"><router-outlet></router-outlet></div>
    `,
    styles: []
})
export class AppComponent {}
