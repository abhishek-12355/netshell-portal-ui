import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Application } from '../../../models/models';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  private applications: Application[];

  //TODO: nul check
  private selectedApp: Application;

  constructor(private appService: ApplicationService, private sanitizer: DomSanitizer) { }

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

}
