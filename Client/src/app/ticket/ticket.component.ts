import { Component, OnInit, Input } from "@angular/core";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";

@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
})
export class TicketComponent implements OnInit {
    constructor(private backendService: BackendService) {}

    public complexityPoints = [1, 2, 3, 5, 8, 13, 20];

    ngOnInit() {}

    @Input()
    public ticket: TicketModel;

    @Input()
    public numberOfUsers: number;

    get remainingVotes(): number {
        return this.numberOfUsers - this.ticket.votes.length;
    }

    public vote(vote: number): void {
        this.ticket.voteByMe(vote, this.numberOfUsers);
        this.backendService.vote({
            ticketName: this.ticket.name,
            vote,
        });
    }

    public abstainFromVoting(): void {
        this.vote(null);
    }
}
