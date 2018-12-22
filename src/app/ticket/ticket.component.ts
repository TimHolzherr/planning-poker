import { Component, OnInit, Input } from "@angular/core";
import { TicketModel } from "./ticket.model";

@Component({
    selector: "app-ticket",
    template: `
        <p>Ticket: {{ ticket.name }}</p>
        <div class="vote-container">
            <div *ngIf="!ticket.hasVoted && !ticket.voteFinished">
                <app-vote-button
                    *ngFor="let cp of complexityPoints"
                    [complexityPoints]="cp"
                    (vote)="vote($event)"
                >
                </app-vote-button>
                <app-vote-button (vote)="vote($event)"> </app-vote-button>
            </div>
        </div>
        <div *ngIf="ticket.hasVoted && !ticket.voteFinished">
            <p>
                You voted: <strong>{{ ticket.yourVote }}.</strong>
            </p>
            <p>
                Waiting for {{ numberOfUsers - this.ticket.votes.length }} other
                votes.
            </p>
        </div>
        <div *ngIf="ticket.voteFinished">
            Results: {{ ticket.votes.join(", ") }} Average:
            {{ ticket.getAverageVote() }}
        </div>
    `,
    styles: [
        `
            .vote-container {
                display: inline-block;
                min-width: 32px;
            }
        `
    ]
})
export class TicketComponent implements OnInit {
    constructor() {}

    public complexityPoints = [1, 2, 3, 5, 8, 13, 20];

    ngOnInit() {}

    @Input()
    public ticket: TicketModel;

    @Input()
    public numberOfUsers: number;

    public vote(number: number): void {
        this.ticket.yourVote = number;
        this.ticket.votes.push(number);
        this.ticket.hasVoted = true;
    }
}
