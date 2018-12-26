import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-vote-button",
    template: `
        <div class="column is-3-tablet is-4-mobile">
            <input
                type="button"
                *ngIf="complexityPoints"
                class="button is-fullwidth is-warning"
                (click)="vote.emit(complexityPoints)"
                [value]="complexityPoints"
            />

            <form
                *ngIf="!complexityPoints"
                class="is-fullwidth"
                (submit)="customValueVote()"
            >
                <input
                    name="voteValue"
                    class="input is-warning is-fullwidth"
                    placeholder="Custom Value"
                    type="number"
                    [(ngModel)]="complexityPointsInput"
                />
            </form>
        </div>
    `
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
