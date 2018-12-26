import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionModel } from "../models/session.model";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";

@Component({
    selector: "app-session",
    template: `
        <div class="hero has-text-centered is-light">
            <div class="title is-1">{{ this.model.name }}</div>
            <div class="subtitle"></div>
        </div>
        <div class="section">
            <div class="notification has-text-centered is-info">
                <p>
                    {{ model.numberOfUsers }} member{{
                        model.numberOfUsers > 1 ? "s" : ""
                    }}
                    joined the session.
                </p>
                <p>
                    Invite others to join at
                    <a [href]="currentUrl">{{ currentUrl }}</a>
                </p>
            </div>
        </div>
        <div *ngIf="!model.hasTickets()">
            <div class="section">
                <form (submit)="createNewTicket(nextTicketName)">
                    <div class="block">
                        <p class="control field has-text-centered">
                            <label for="ticketName" class="label"
                                >Create the first ticket</label
                            >
                        </p>
                        <div class="field has-addons has-addons-centered">
                            <p class="control">
                                <input
                                    class="input"
                                    [(ngModel)]="nextTicketName"
                                    name="ticketName"
                                    id="ticketName"
                                    placeholder="Name of the Ticket"
                                    required
                                />
                            </p>
                            <p class="control">
                                <input
                                    [disabled]="nextTicketName === ''"
                                    class="button is-info"
                                    type="submit"
                                    value="Create new Ticket"
                                />
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div *ngIf="model.hasTickets()">
            <div class="title is-3 has-text-centered">Ticket</div>
            <div class="columns">
                <div class="box column is-10 is-offset-1">
                    <app-ticket
                        [ticket]="model.currentTicket"
                        [numberOfUsers]="this.model.numberOfUsers"
                    ></app-ticket>
                </div>
            </div>
            <div class="footer">
                <form (submit)="createNewTicket(nextTicketName)">
                    <div class="level">
                        <div class="level-left">
                            <input
                                [disabled]="model.isfirstTicket()"
                                class="button level-item"
                                type="button"
                                value="Previous"
                                (click)="model.goToPreviousTicket()"
                            />
                        </div>
                        <div class="level-right">
                            <div class="field has-addons">
                                <ng-container *ngIf="model.isLastTicket()">
                                    <p class="control">
                                        <input
                                            class="input level-item"
                                            name="nextTicketName"
                                            required
                                            placeholder="Name of next ticket"
                                            [(ngModel)]="nextTicketName"
                                        />
                                    </p>
                                    <p class="control">
                                        <input
                                            [disabled]="nextTicketName === ''"
                                            class="button level-item"
                                            type="submit"
                                            value="Create new Ticket"
                                        />
                                    </p>
                                </ng-container>
                                <ng-container *ngIf="!model.isLastTicket()">
                                    <p class="control">
                                        <input
                                            class="button level-item"
                                            type="button"
                                            value="Next"
                                            (click)="model.goToNextTicket()"
                                        />
                                    </p>
                                </ng-container>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: [
        `
            .footer {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 1rem;
                background-color: #efefef;
                text-align: center;
            }
        `
    ]
})
export class SessionComponent implements OnInit {
    public model = new SessionModel();
    public nextTicketName = "";
    public currentUrl: string;

    constructor(
        public route: ActivatedRoute,
        private backendService: BackendService
    ) {
        this.route.url.subscribe(urlParameters => {
            this.model.name = urlParameters[0].path;
        });
        this.currentUrl = window.location.href;
    }

    ngOnInit() {
        this.model.numberOfUsers = 1;
        this.model.addNewTicket(new TicketModel("test"));
        this.backendService.linkBackendToModel(this.model);
    }

    public createNewTicket(name: string): void {
        if (!name) {
            return;
        }
        this.model.addNewTicket(new TicketModel(name));
        this.nextTicketName = "";
        this.backendService.addNewTicket({ ticketName: name });
    }
}
