import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionModel } from "../models/session.model";
import { TicketModel } from "../models/ticket.model";
import { BackendService } from "../backend.service";

@Component({
    selector: "app-session",
    templateUrl: "./session.component.html"
})
export class SessionComponent implements OnInit {
    public model = new SessionModel();
    public nextTicketName = "";
    public currentUrl: string;

    constructor(
        public route: ActivatedRoute,
        private backendService: BackendService
    ) {
        this.route.url.subscribe(urlParameters => {
            this.model.name = urlParameters[0].path;
        });
        this.currentUrl = window.location.href;
    }

    ngOnInit() {
        this.model.numberOfUsers = 1;
        this.backendService.linkBackendToModel(this.model);
    }

    public createNewTicket(name: string): void {
        if (!name) {
            return;
        }
        this.model.addNewTicket(new TicketModel(name));
        this.nextTicketName = "";
        this.backendService.addNewTicket({ ticketName: name });
    }
}
