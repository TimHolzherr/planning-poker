import { Component, OnInit, Input } from "@angular/core";
import { TicketModel } from "src/app/models/ticket.model";
import { IChartistData, IBarChartOptions } from "chartist";

@Component({
    selector: "app-results",
    template: `
        <div class="has-text-centered">
            <div class="title is-4">Results</div>
            <p>All votes: {{ ticket.getSortedVote().join(", ") }}</p>
            <p>Average: {{ ticket.getAverageVote() | number: "1.0-2" }}</p>
            <app-chart [data]="data" [options]="options"></app-chart>
        </div>
    `,
    styles: [],
})
export class ResultsComponent implements OnInit {
    @Input() ticket: TicketModel;

    public data: IChartistData;
    public options: IBarChartOptions;

    ngOnInit() {
        this.data = this.transformVotesToChartist();
        this.options = {
            axisX: {
                onlyInteger: true,
            },
            axisY: {
                onlyInteger: true,
            },
        };
    }

    private transformVotesToChartist(): IChartistData {
        var counts = {};
        this.ticket.nonNullVotes.forEach(num => {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        });
        var series = [];
        var labels = [];
        for (
            var i = Math.min(...this.ticket.nonNullVotes);
            i <= Math.max(...this.ticket.nonNullVotes);
            i++
        ) {
            labels.push(i);
            series.push(counts[i] ? counts[i] : 0);
        }
        return {
            labels: labels,
            series: [series],
        };
    }
}
