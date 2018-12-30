import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { Bar, IChartistData, IBarChartOptions } from "chartist";

@Component({
    selector: "app-chart",
    template: "<ng-content></ng-content>",
})
export class ChartComponent implements OnInit {
    constructor(private element: ElementRef) {}

    @Input()
    data: IChartistData;

    @Input()
    options: IBarChartOptions;

    ngOnInit() {
        new Bar(this.element.nativeElement, this.data, this.options);
    }
}
