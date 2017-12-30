import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PortalComponent } from './portal/portal.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ApplicationService } from '../../services/application.service';
import { MapToArrayPipe } from '../../pipes/map-to-array.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [PortalComponent, MainContentComponent, MapToArrayPipe],
	exports: [PortalComponent],
	providers: [ApplicationService]
})
export class PortalModule { }
