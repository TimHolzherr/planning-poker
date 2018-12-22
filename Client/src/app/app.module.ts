import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SessionComponent } from "./session/session.component";
import { TicketComponent } from './ticket/ticket.component';
import { VoteButtonComponent } from './ticket/vote-button/vote-button.component';

@NgModule({
    declarations: [AppComponent, WelcomeComponent, SessionComponent, TicketComponent, VoteButtonComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
