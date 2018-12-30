import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
})
export class WelcomeComponent {
    constructor(private router: Router) {}

    public sessionName: string;

    public CreateNewSession(): void {
        this.router.navigate([this.sessionName]);
    }
}
