import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-vote-button",
    template: `
        <input
            type="button"
            *ngIf="complexityPoints"
            class="vote-button"
            (click)="vote.emit(complexityPoints)"
            [value]="complexityPoints"
        />

        <form
            *ngIf="!complexityPoints"
            class="vote-button"
            (submit)="customValueVote()"
        >
            <input
                name="voteValue"
                class="vote-value"
                placeholder="Custom Value"
                type="number"
                [(ngModel)]="complexityPointsInput"
            />
        </form>
    `,
    styles: [
        `
            .vote-button {
                position: relative;
                background-color: lightyellow;
                border: 2px solid black;
                box-shadow: 2px 2px 2px gray;
            }
            .vote-value {
                position: absolute;
                top: 50%;
                left: 50%;
                margin: 0;
                margin-right: -50%;
                transform: translate(-50%, -50%);
            }
        `
    ]
})
export class VoteButtonComponent {
    constructor() {}

    public complexityPointsInput: number;

    public customValueVote(): void {
        if (this.complexityPointsInput) {
            this.vote.emit(this.complexityPointsInput);
        }
    }

    @Input()
    public complexityPoints: number = 0;

    @Output()
    public vote: EventEmitter<number> = new EventEmitter();
}
