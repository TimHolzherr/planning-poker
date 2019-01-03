import { Injectable } from "@angular/core";
import { SessionModel } from "./models/session.model";
import * as io from "socket.io-client";
import {
    NewTicketMessage,
    MessageType,
    MessageBody,
    VoteMessage,
    SendModelMessage,
} from "./models/messages.model";
import { TicketModel } from "./models/ticket.model";
import { environment } from "src/environments/environment";
import { guid } from "./guid";

const messageToOthers = "message to others";
const sendModel = "send model";

@Injectable({
    providedIn: "root",
})
export class BackendService {
    private socket: SocketIOClient.Socket;
    private model: SessionModel;
    private clientId: string = guid();

    public linkBackendToModel(model: SessionModel): void {
        this.model = model;
        this.model.addUser(this.clientId);
        environment.backendServer;
        this.socket = io(environment.backendServer, {
            query: `room=${model.name}&clientId=${this.clientId}`,
        });

        this.socket.on(messageToOthers, data => {
            this.processMessage(data);
        });

        this.socket.on("user connected", ({ clientId }) => {
            console.log("user connected");
            this.model.addUser(clientId);
        });

        this.socket.on("user disconnected", ({ clientId }) => {
            this.model.removeUser(clientId);
            this.model.tickets.forEach(t =>
                t.checkIfVoteFinished(this.model.numberOfUsers)
            );
        });

        this.socket.on(sendModel, data => {
            this.setModel(data);
        });

        this.socket.on("ask for model", data => {
            this.sendModel(data.id);
        });
    }

    public addNewTicket(newTicket: NewTicketMessage): void {
        this.sendMessageToOthers({
            type: MessageType.NewTicket,
            payload: newTicket,
            clientId: this.clientId,
        });
    }

    public vote(voteMessage: VoteMessage) {
        this.sendMessageToOthers({
            type: MessageType.Vote,
            payload: voteMessage,
            clientId: this.clientId,
        });
    }

    private sendMessageToOthers(messagePayload: MessageBody): void {
        this.socket.emit(messageToOthers, messagePayload);
    }

    private sendModel(id: any): void {
        console.log("send model to", id);
        const payload: SendModelMessage = {
            session: this.model.asDto(),
            id: id,
        };
        this.socket.emit(sendModel, payload);
    }

    private processMessage(body: MessageBody): void {
        this.processNewTicket(body);
        this.processVote(body);
    }

    private processVote(body: MessageBody) {
        if (body.type === MessageType.Vote) {
            const payload = body.payload as VoteMessage;
            var ticket = this.model.tickets.find(
                t => t.name === payload.ticketName
            );
            if (ticket) {
                ticket.voteByOther(payload.vote, this.model.numberOfUsers);
            }
        }
    }

    private processNewTicket(body: MessageBody) {
        if (body.type === MessageType.NewTicket) {
            this.model.addNewTicket(new TicketModel(body.payload.ticketName));
        }
    }

    private setModel(data: SendModelMessage): void {
        console.log("setModel", data);
        this.model.setSessionFromDto(data.session);
    }
}
