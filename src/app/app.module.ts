import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PortalModule } from './modules/portal/portal.module';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
