import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MessageBus, Connection, Message } from 'ngx-message-bus';

import { Application } from '../../../models/models';
import { ApplicationService } from '../../../services/application.service';
import { PortalMessage, PortalCommand } from '../../../services/portal.service';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

    private applications: Application[];

    //TODO: nul check
    private selectedApp: Application;

    private connection: Connection;

    constructor(
        private appService: ApplicationService, 
        private sanitizer: DomSanitizer, 
        private bus: MessageBus) {
            this.connection = this.bus.connect("PORTAL_HUB", "portal-host");
            this.connection.on({
                groupId: 'PortalMessage',
                callback: this.portalCallback.bind(this)
            })
        }

    ngOnInit() {
        this.appService.getAllApplications()
            .subscribe(apps => {
                this.applications = apps;
                this.selectedApp = this.applications.find(p => p.default) || this.applications.length > 0 && this.applications[0];
            });
    }

    onSelect(id: number): void {
        this.selectedApp = this.applications[id];
    }

    sanitize(uri: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(uri);
    }

    ngOnDestroy() {
        this.connection.off({
            groupId: 'PortalMessage',
            callback: null
        })
        this.bus.disconnect(this.connection);
    }

    portalCallback(message: PortalMessage): void {
        if (message.command === PortalCommand.ACTIVATE) {
            console.log("switching application " + this.selectedApp.id + " -> " + message.targetApplicationId);
            this.onSelect(message.targetApplicationId);
        }
    }

}
