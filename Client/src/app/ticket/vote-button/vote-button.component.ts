import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-vote-button",
    template: `
        <div *ngIf="complexityPoints" class="column is-3-tablet is-4-mobile">
            <input
                type="button"
                class="button is-fullwidth is-warning"
                (click)="vote.emit(complexityPoints)"
                [value]="complexityPoints"
            />
        </div>
        <div *ngIf="!complexityPoints" class="column is-3-tablet is-8-mobile">
            <form class="is-fullwidth" (submit)="customValueVote()">
                <div class="field has-addons is-fullwidth">
                    <div class="control is-fullwidth">
                        <input
                            name="voteValue"
                            class="input is-warning is-fullwidth"
                            placeholder="Custom Value"
                            type="number"
                            [(ngModel)]="complexityPointsInput"
                        />
                    </div>
                    <div class="control">
                        <button
                            class="button is-success"
                            type="submit"
                            value="Submit"
                            [disabled]="!isValidVote()"
                            [innerHTML]="asciiCheckMark"
                        ></button>
                    </div>
                </div>
            </form>
        </div>
    `,
})
export class VoteButtonComponent {
    constructor() {}

    public complexityPointsInput: number;

    public asciiCheckMark = "&#x2714";

    public customValueVote(): void {
        if (this.isValidVote()) {
            this.vote.emit(this.complexityPointsInput);
        }
    }

    @Input()
    public complexityPoints: number = 0;

    @Output()
    public vote: EventEmitter<number> = new EventEmitter();

    public isValidVote() {
        return (
            this.complexityPointsInput &&
            Number.isSafeInteger(this.complexityPointsInput) &&
            this.complexityPointsInput > 0
        );
    }
}
