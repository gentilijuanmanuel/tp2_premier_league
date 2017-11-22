import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class Services {
    private firstPartUrl = "http://localhost:3000/api/";
    data: any = {};

    constructor(private http: Http) {

    }

    getData (url) {
        return this.http.get(url)
        .map((res: Response) => res.json());
    }

    getActiveMatches() {
        let url = this.firstPartUrl + "match/active";
        return this.getData(url);
    }

    getMatches() {
        let url = this.firstPartUrl + "match";
        return this.getData(url);
    }
}