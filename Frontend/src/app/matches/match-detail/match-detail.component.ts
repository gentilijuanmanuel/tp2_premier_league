import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../match.model';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  @Input() match: Match;

  constructor() { }

  ngOnInit() { }

}
