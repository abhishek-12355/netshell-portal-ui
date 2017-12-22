import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Application } from '../../../models/models';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  private apps: Map<number, ApplicationDetails> = new Map<number, ApplicationDetails>()

  @Input()
  selectedAppId: number;

  constructor(private sanitizer: DomSanitizer, private appService: ApplicationService) { }

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

}

interface ApplicationDetails {
	application: Application;
	safeUrl: SafeResourceUrl;
	id: number;
}
