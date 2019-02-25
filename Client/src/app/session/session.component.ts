import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionModel } from "../models/session.model";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";
import { Title } from "@angular/platform-browser";
import { ColorService } from "../ticket/color/color.service";

@Component({
    selector: "app-session",
    templateUrl: "./session.component.html",
})
export class SessionComponent implements OnInit {
    public model = new SessionModel();
    public currentUrl: string;

    constructor(
        public route: ActivatedRoute,
        private backendService: BackendService,
        private titleService: Title,
        private colorService: ColorService
    ) {
        this.route.url.subscribe(urlParameters => {
            this.model.name = urlParameters[0].path;
            this.titleService.setTitle(`Planning-Poker: ${this.model.name}`);
        });
        this.currentUrl = window.location.href;
    }

    ngOnInit() {
        this.backendService.linkBackendToModel(this.model);
    }

    public createNewTicket(name: string): void {
        if (!name || this.model.tickets.find(t => t.name === name)) {
            return;
        }
        var color = this.colorService.nextRandomColor();
        this.model.addNewTicket(new TicketModel(name, color));
        this.backendService.addNewTicket({ ticketName: name, color: color });
    }
}
