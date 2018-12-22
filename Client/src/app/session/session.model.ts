import { TicketModel } from "../ticket/ticket.model";

export class SessionModel {
    numberOfUsers: number;
    name: string;
    tickets: TicketModel[] = [];
    currentTicket: TicketModel;
    IsInitialCreator: boolean;
    IsObserver: boolean;

    public goToPreviousTicket(): any {
        this.currentIndex = this.currentIndex === 0 ? 0 : this.currentIndex - 1;
    }

    public goToNextTicket(): any {
        const lastIndex = this.tickets.length - 1;
        this.currentIndex =
            this.currentIndex === lastIndex ? lastIndex : this.currentIndex + 1;
    }

    public goToLastTicket(): any {
        this.currentIndex = this.tickets.length - 1;
    }

    public isLastTicket(): boolean {
        return this.currentIndex === this.tickets.length - 1;
    }

    public isfirstTicket(): boolean {
        return this.currentIndex === 0;
    }

    private get currentIndex(): number {
        return this.tickets.findIndex(t => t === this.currentTicket);
    }

    private set currentIndex(index: number) {
        this.currentTicket = this.tickets[index];
    }
}
