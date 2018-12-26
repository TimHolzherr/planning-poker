import { Component, OnInit, Input } from "@angular/core";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";

@Component({
    selector: "app-ticket",
    template: `
        <ng-container *ngIf="!ticket.hasVoted && !ticket.voteFinished">
            <div class="title is-4 has-text-centered">
                <p>
                    Please vote for ticket: <strong> {{ ticket.name }}</strong>
                </p>
            </div>
            <div class="columns is-multiline is-mobile">
                <app-vote-button
                    *ngFor="let cp of complexityPoints"
                    [complexityPoints]="cp"
                    (vote)="vote($event)"
                >
                </app-vote-button>
                <app-vote-button (vote)="vote($event)"> </app-vote-button>
            </div>
        </ng-container>
        <div *ngIf="ticket.hasVoted && !ticket.voteFinished">
            <p class="has-text-centered">
                You voted <strong>{{ ticket.yourVote }}</strong
                >, waiting for
                <strong> {{ numberOfUsers - this.ticket.votes.length }}</strong>
                other vote{{
                    numberOfUsers - this.ticket.votes.length > 1 ? "s" : ""
                }}.
            </p>
        </div>
        <div class="has-text-centered" *ngIf="ticket.voteFinished">
            <div class="title is-4">Results</div>
            <p>All votes: {{ ticket.votes.join(", ") }}</p>
            <p>Average: {{ ticket.getAverageVote() }}</p>
        </div>
    `
})
export class TicketComponent implements OnInit {
    constructor(private backendService: BackendService) {}

    public complexityPoints = [1, 2, 3, 5, 8, 13, 20];

    ngOnInit() {}

    @Input()
    public ticket: TicketModel;

    @Input()
    public numberOfUsers: number;

    public vote(vote: number): void {
        this.ticket.voteByMe(vote, this.numberOfUsers);
        this.backendService.vote({
            ticketName: this.ticket.name,
            vote
        });
    }
}
