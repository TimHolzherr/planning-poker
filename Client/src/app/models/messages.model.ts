export interface MessageBody {
    type: MessageType;
    clientId: string;
    payload: VoteMessage | NewTicketMessage;
}

export enum MessageType {
    Vote,
    NewTicket,
}

export interface VoteMessage {
    ticketName: string;
    vote: number;
}

export interface NewTicketMessage {
    ticketName: string;
    color: string;
}

export interface SendModelMessage {
    id: number;
    session: SessionDto;
}

export interface SessionDto {
    users: string[];
    tickets: TicketDto[];
}

export interface TicketDto {
    name: string;
    color: string;
    votes: number[];
    voteFinished: boolean;
}
