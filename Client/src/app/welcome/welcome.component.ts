import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-welcome",
    template: `
        <div class="hero has-text-centered is-light">
            <h1 class="is-size-1 is-size-3-mobile">
                Wellcome to Planning Poker
            </h1>
        </div>

        <div class="section">
            <div class="column is-10 is-offset-1">
                <div class="notification is-size-5-desktop">
                    <p class="is-hidden-mobile">
                        Planning Poker is a webapp to help you organise your
                        User Story estimation meetings. Open a new session and
                        invite your colleagues to join! All members can vote
                        anonymously, nobody knows the results before everybody
                        voted and the outcome is presented in a nice graph. The
                        results are stored in the clients themselves, which
                        communicate with each other via web sockets. None of
                        your data are stored on the server. So once all members
                        of the session close their windows all results are gone.
                    </p>
                    <p class="is-hidden-tablet is-size-6-mobile">
                        Planning Poker is a webapp to help you organise your
                        User Story estimation meetings. Open a new session and
                        invite your colleagues to join! None of your data are
                        stored on the server. So once all members of the session
                        close their windows all results are gone.
                    </p>
                </div>
            </div>
        </div>
        <div class="section">
            <form (submit)="CreateNewSession()">
                <div class="block">
                    <div class="field has-addons has-addons-centered">
                        <p class="control">
                            <input
                                class="input"
                                name="sessionName"
                                placeholder="Session Name"
                                [(ngModel)]="sessionName"
                                required
                            />
                        </p>
                        <p class="control">
                            <input
                                class="button is-info"
                                [disabled]="!this.sessionName"
                                type="submit"
                                value="Create new Session"
                            />
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer is-fixed-bottom">
            <div class="level is-mobile">
                <div class="level-left">
                    <a
                        href="https://github.com/TimHolzherr/planning-poker"
                        class="level-item"
                    >
                        <span class="icon is-medium">
                            <i class="fab fa-github"></i>
                        </span>
                        <span>GitHub</span>
                    </a>
                </div>
                <div class="level-right">
                    <a
                        href="https://www.linkedin.com/in/tim-holzherr-63442ab4/"
                        class="level-item"
                    >
                        <span>Tim Holzherr</span>
                        <span class="icon is-medium">
                            <i class="fab fa-linkedin"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
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
