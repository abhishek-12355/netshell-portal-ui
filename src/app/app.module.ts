import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageBus } from 'ngx-message-bus';

import { AppComponent } from './app.component';
import { PortalModule } from './modules/portal/portal.module';
import { PortalService } from './services/portal.service';
// import { MapToArrayPipe } from './pipes/map-to-array.pipe';


@NgModule({
    declarations: [
        AppComponent/*,
        MapToArrayPipe*/
    ],
    imports: [
        BrowserModule,
        PortalModule
    ],
    providers: [MessageBus, PortalService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private portalService: PortalService) { }
}
