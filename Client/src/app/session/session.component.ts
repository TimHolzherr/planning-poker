import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionModel } from "./session.model";
import { TicketModel } from "../ticket/ticket.model";
import * as io from "socket.io-client";

@Component({
    selector: "app-session",
    template: `
        <div>
            <span>
                {{ model.numberOfUsers }} people joined the session for
                <strong>{{ this.model.name }}</strong>
            </span>
        </div>

        <div *ngIf="!hasTickets()">
            <form (submit)="createNewTicket(nextTicketName)">
                <label for="ticketName">Create the first ticket</label>
                <input
                    [(ngModel)]="nextTicketName"
                    name="ticketName"
                    id="ticketName"
                    placeholder="Name of the Ticket"
                    required
                />
                <input
                    [disabled]="nextTicketName === ''"
                    class="button-primary"
                    type="submit"
                    value="Create new Ticket"
                />
            </form>
        </div>
        <div *ngIf="hasTickets()">
            <app-ticket
                [ticket]="model.currentTicket"
                [numberOfUsers]="this.model.numberOfUsers"
            ></app-ticket>
            <div class="footer">
                <form (submit)="createNewTicket(nextTicketName)">
                    <input
                        [disabled]="model.isfirstTicket()"
                        class="button-primary"
                        type="button"
                        value="Previous"
                        (click)="model.goToPreviousTicket()"
                    />
                    <ng-container *ngIf="model.isLastTicket()">
                        <input
                            name="nextTicketName"
                            required
                            placeholder="Name of next ticket"
                            [(ngModel)]="nextTicketName"
                        />
                        <input
                            [disabled]="nextTicketName === ''"
                            class="button-primary"
                            type="submit"
                            value="Create new Ticket"
                        />
                    </ng-container>
                    <ng-container *ngIf="!model.isLastTicket()">
                        <input
                            class="button-primary"
                            type="button"
                            value="Next"
                            (click)="model.goToNextTicket()"
                        />
                    </ng-container>
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
            strong {
                padding: 0;
                margin: 0;
            }
        `
    ]
})
export class SessionComponent implements OnInit {
    constructor(public route: ActivatedRoute) {
        this.model = new SessionModel();
        this.model.numberOfUsers = 8;
        this.route.url.subscribe(urlParameters => {
            this.model.name = urlParameters[0].path;
        });
    }

    public nextTicketName = "";

    public hasTickets(): boolean {
        return Boolean(this.model.currentTicket);
    }

    socket: SocketIOClient.Socket;

    ngOnInit() {
        // Register with server, create new room if it does not yet exist
        this.socket = io();
    }

    public model: SessionModel;

    public createNewTicket(name: string): void {
        if (!name) {
            return;
        }
        var ticket = new TicketModel();
        ticket.name = name;
        this.model.tickets.push(ticket);
        this.model.currentTicket = ticket;
        this.nextTicketName = "";
    }
}
