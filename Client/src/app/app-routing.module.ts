import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SessionComponent } from "./session/session.component";

const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent,
    },
    {
        path: "**",
        component: SessionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
