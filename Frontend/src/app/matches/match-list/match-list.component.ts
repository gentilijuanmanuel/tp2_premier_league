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
  selectedMatch: Match;

  constructor(private services: Services) {

  }

  ngOnInit() {
    this.services.getActiveMatches().subscribe(data => this.matches = data);
  }

  onSelect(match: Match): void {
    this.selectedMatch = match;
  }

}
