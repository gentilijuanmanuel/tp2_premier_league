import { Component, OnInit } from '@angular/core';
import { Match } from '../match.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Services } from '../../services';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
  providers: [Services]
})
export class MatchListComponent implements OnInit {
  private matches = [];

  constructor(private services: Services) {

  }

  ngOnInit() {
    this.services.getMatches().subscribe(data => this.matches = data);
    console.log(this.matches);
  }

}
