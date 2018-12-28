import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(hideServerSideRenderedContent)
    .catch(err => console.error(err));

function hideServerSideRenderedContent(): void {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".server-side-rendered { display: none }";
    document.body.appendChild(css);
}
