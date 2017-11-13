import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class Services {
    private firstPartUrl = "localhost:3000";
    private apiURL = "";
    data: any = {};

    constructor(private http: Http) {

    }

    getActiveMatches() {

    }

    getMatch() {

    }
}