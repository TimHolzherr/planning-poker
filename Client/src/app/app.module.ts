import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SessionComponent } from "./session/session.component";
import { TicketComponent } from "./ticket/ticket.component";
import { VoteButtonComponent } from "./ticket/vote-button/vote-button.component";
import { ResultsComponent } from "./ticket/results/results.component";
import { ChartComponent } from "./ticket/results/chart/chart.component";

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        SessionComponent,
        TicketComponent,
        VoteButtonComponent,
        ResultsComponent,
        ChartComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule {}
