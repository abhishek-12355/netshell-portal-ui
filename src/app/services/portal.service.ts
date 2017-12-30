import { Injectable, OnDestroy } from '@angular/core';

import { MessageBus, Connection, Message } from 'ngx-message-bus';

import { ApplicationService } from './application.service';
import { Application } from '../models/models';

@Injectable()
export class PortalService implements OnDestroy {

    private connection: Connection;

    constructor(
        private internalBus: MessageBus,
        private appService: ApplicationService
    ) {
        this.connection = this.internalBus.connect("PORTAL_HUB", "portal");
        this.connection.on({
            groupId: "PortalMessage",
            callback: this.handleBusCallback.bind(this)
        });

        window.addEventListener("message", this.handlePortalMessage.bind(this));
    }

    ngOnDestroy() {
        this.connection.off({
            groupId: "PortalMessage",
            callback: null
        });

        this.internalBus.disconnect(this.connection);
        window.removeEventListener("message", this.handlePortalMessage);
    }

    private handlePortalMessage(messageEvent: MessageEvent): void {
        let data = messageEvent.data;

        if (!data.command) {
            return;
        }

        console.log("message recieved", data);

        this.appService.getAllApplications()
            .subscribe(apps => {
                let sourceApp = apps.find(app => app.domain === messageEvent.origin);
                let targetApp = apps.find(app => app.id === data.targetApplicationId);

                if (!sourceApp && messageEvent.origin === this.appService.getPortalApplication().domain) {
                    sourceApp = this.appService.getPortalApplication();
                }

                this.postMessageOnBus(sourceApp, targetApp, data);
            });
    }

    private handleBusCallback(message: PortalMessage): void {
        this.appService.getAllApplications()
            .subscribe(apps => {
                let targetApp = apps.find(app => app.id === +message.targetApplicationId);
                this.postPortalMessage(targetApp, message);
            });
    }

    private postMessageOnBus(src: Application, target: Application, data: any): void {
        let recIds = null;

        if (!src) {
            console.warn("message recieved without source", data);
            return;
        }

        let payload: PortalMessage = {
            targetApplicationId: data.targetApplicationId,
            sourceApplicationId: src.id,
            data: data.data,
            command: data.command
        }

        this.connection.post({
            groupId: "PortalMessage",
            recipentIds: recIds,
            payload: payload
        });
    }

    private postPortalMessage(target: Application, message: PortalMessage): void {
        let win = this.appService.getApplicationWindowById(message.targetApplicationId);
        let msg = {
            targetApplicationId: message.targetApplicationId,
            data: message.data,
            command: PortalCommand.ACTIVATE
        }
        win.postMessage(msg, target.domain);
    }

}

export interface PortalMessage {
    targetApplicationId: number;
    sourceApplicationId: number;
    data: any;
    command: PortalCommand;
}

export enum PortalCommand {
    ACTIVATE = 1
}