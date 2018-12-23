export interface MessageBody {
    type: MessageType;
    payload: VoteMessage | NewTicketMessage;
}

export enum MessageType {
    Vote,
    NewTicket
}

export interface VoteMessage {
    ticketName: string;
    vote: number;
}

export interface NewTicketMessage {
    ticketName: string;
}

export interface SendModelMessage {
    id: number;
    session: SessionDto;
}

export interface SessionDto {
    numberOfUsers: number;
    tickets: TicketDto[];
}

export interface TicketDto {
    name: string;
    votes: number[];
    voteFinished: boolean;
}
