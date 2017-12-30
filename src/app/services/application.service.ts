import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import * as $ from 'jquery';

import { Application } from '../models/models';


@Injectable()
export class ApplicationService {

    private applications: Application[] = [
        { id: 0, default: true, name: "Gotechnies", path: "https://gotechnies.com", icon: "", domain: "https://gotechnies.com" },
        { id: 1, default: true, name: "App2", path: "https://gotechnies.com/install-subversion-websvn-ubuntu-16-04/", icon: "", domain: "https://gotechnies.com" },
        { id: 2, default: false, name: "App3", path: "https://gotechnies.com/magento2/", icon: "", domain: "https://gotechnies.com" },
    ];

    private portalApplication: Application = {
        id: 9999, default: false, name: 'PortalApp', path: window.location.pathname, icon: '', domain: window.location.origin
    }

    constructor() { }

    getAllApplications(): Observable<Application[]> {
        return of(this.applications);
    }

    getApplicationById(id: number): Observable<Application> {
        let result: Application = null;
        this.getAllApplications()
            .subscribe(apps => {
                result = apps.find(app => app.id == id);
            });
        return of(result);
    }

    getApplicationWindowById(applicationId: number): Window {
        let w = $('#App_' + applicationId)[0];
        let i = w.contentWindow;
        return i;
    }

    getPortalApplication(): Application {
        return this.portalApplication;
    }

    //********************
    // Helper Methods
    //********************

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.warn(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
