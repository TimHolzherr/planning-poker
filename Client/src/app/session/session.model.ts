import { TicketModel } from "../ticket/ticket.model";

export class SessionModel {
    numberOfUsers = 0;
    name: string;
    tickets: TicketModel[] = [];
    currentTicket: TicketModel;
    IsInitialCreator = false;
    IsObserver = false;

    public addNewTicket(ticket: TicketModel): void {
        this.tickets.push(ticket);
        this.currentTicket = ticket;
    }

    public hasTickets(): boolean {
        return Boolean(this.currentTicket);
    }

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
