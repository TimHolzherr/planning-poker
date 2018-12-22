import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-welcome",
    template: `
        <h1>Wellcome to Planning Poker</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <form (submit)="CreateNewSession()">
            <input
                name="sessionName"
                placeholder="Session Name"
                [(ngModel)]="sessionName"
                required
            />
            <input
                [disabled]="!this.sessionName"
                class="button-primary"
                type="submit"
                value="Create new Session"
            />
        </form>
    `,
    styles: []
})
export class WelcomeComponent {
    constructor(private router: Router) {}

    public sessionName;

    public CreateNewSession(): void {
        this.router.navigate([this.sessionName]);
    }
}
