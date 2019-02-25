import { TicketModel } from "./ticket.model";
import { TicketDto, SessionDto } from "./messages.model";

export class SessionModel {
    get numberOfUsers(): number {
        return this.users.size;
    }
    name: string;
    nextTicketName = "";
    tickets: TicketModel[] = [];
    currentTicket: TicketModel;
    IsInitialCreator = false;
    IsObserver = false;
    private users = new Set();
    private removedUsers = new Set();

    public addNewTicket(ticket: TicketModel): void {
        this.tickets.push(ticket);
        this.currentTicket = ticket;
        this.nextTicketName = "";
    }

    public hasTickets(): boolean {
        return Boolean(this.currentTicket);
    }

    public setSessionFromDto(dto: SessionDto): void {
        dto.users
            .filter(u => !this.removedUsers.has(u))
            .forEach(u => this.users.add(u));
        this.setTickets(dto.tickets);
    }

    public asDto(): SessionDto {
        return {
            users: Array.from(this.users),
            tickets: this.tickets.map(t => {
                return {
                    name: t.name,
                    votes: t.votes,
                    color: t.color,
                    voteFinished: t.voteFinished,
                };
            }),
        };
    }

    public addUser(user: string): void {
        this.users.add(user);
    }

    public removeUser(user: string): void {
        this.users.delete(user);
        this.removedUsers.add(user);
    }

    private setTickets(tickets: TicketDto[]) {
        this.tickets = tickets.map(dto => {
            var newTicket = new TicketModel(dto.name, dto.color);
            newTicket.voteFinished = dto.voteFinished;
            newTicket.votes = dto.votes;
            return newTicket;
        });
        this.goToLastTicket();
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
