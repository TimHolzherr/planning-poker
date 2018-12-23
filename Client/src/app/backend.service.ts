import { Injectable } from "@angular/core";
import { SessionModel } from "./session/session.model";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root"
})
export class BackendService {
    private socket: SocketIOClient.Socket;
    private model: SessionModel;

    public linkBackendToModel(model: SessionModel): void {
        this.model = model;
        this.socket = io(`http://localhost:3000/`, {
            query: `room=${model.name}`
        });

        this.socket.on("message to others", data => {
            this.processMessage(data);
        });

        this.socket.on("user connected", () => {
            console.log("user connected");
            this.model.numberOfUsers++;
        });

        this.socket.on("user disconnected", () => {
            this.model.numberOfUsers--;
        });

        this.socket.on("send model", data => {
            this.setModel(data);
        });

        this.socket.on("ask for model", data => {
            this.sendModel(data.id);
        });
    }

    private sendModel(id: any): any {
        console.log("send model to", id);
        this.socket.emit("send model", {
            id: id,
            numberOfUsers: this.model.numberOfUsers
        });
    }

    private processMessage(data: any): any {
        console.log("recived mesage to others, with", data);
    }

    private setModel(data: any): void {
        console.log("setModel", data);
        this.model.numberOfUsers = data.numberOfUsers;
    }
}
