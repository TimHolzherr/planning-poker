import { Component, OnInit, Input } from "@angular/core";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";
import {
    trigger,
    style,
    animate,
    transition,
    keyframes,
} from "@angular/animations";

@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
    animations: [
        trigger("fadeIn", [
            transition("* => *", [
                animate(
                    "1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
                    keyframes([
                        style({
                            opacity: "0",
                            offset: 0,
                        }),
                        style({
                            opacity: "1",
                            offset: 1,
                        }),
                    ])
                ),
            ]),
        ]),
    ],
})
export class TicketComponent implements OnInit {
    constructor(private backendService: BackendService) {}

    public complexityPoints = [1, 2, 3, 5, 8, 13, 20];

    ngOnInit() {}

    private _ticket: TicketModel;
    @Input()
    public get ticket(): TicketModel {
        return this._ticket;
    }
    public set ticket(value: TicketModel) {
        this._ticket = value;
        this.animationChanged = !this.animationChanged;
    }

    @Input()
    public numberOfUsers: number;

    public animationChanged = false;

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

    public endVotePrematurly(): void {
        this.ticket.voteFinished = true;
    }
}
