import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MessageBus, Connection, Message } from 'ngx-message-bus';

import { Application } from '../../../models/models';
import { ApplicationService } from '../../../services/application.service';
import { PortalMessage } from '../../../services/portal.service';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {

    private apps: Map<number, ApplicationDetails> = new Map<number, ApplicationDetails>()
    private connection: Connection;

    @Input()
    selectedAppId: number;

    constructor(
        private sanitizer: DomSanitizer,
        private appService: ApplicationService,
        private bus: MessageBus) {
        this.connection = this.bus.connect("PORTAL_HUB", "app-host");
        this.connection.on({
            groupId: 'PortalMessage',
            callback: this.portalCallback.bind(this)
        })
    }

    ngOnInit() {
        this.appService.getAllApplications()
            .subscribe(appList =>
                appList.forEach(app =>
                    this.apps.set(app.id, {
                        application: app,
                        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(app.path),
                        id: app.id
                    })));
    }

    ngOnDestroy() {
        this.connection.off({
            groupId: 'PortalMessage',
            callback: null
        })
        this.bus.disconnect(this.connection);
    }

    portalCallback(message: PortalMessage): void {
        console.log(message);

        this.connection.post({
            groupId: "PortalMessage",
            recipentIds: null,
            payload: message
        });
    }

}

interface ApplicationDetails {
    application: Application;
    safeUrl: SafeResourceUrl;
    id: number;
}
