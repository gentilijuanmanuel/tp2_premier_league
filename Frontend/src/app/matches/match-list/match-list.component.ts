import { Component, OnInit } from '@angular/core';
import { Match } from '../match.model';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  matches: Match[] = [
    new Match("", "1 a 0", "Estadio de Milan", "Milan", "Inter", ""),
    new Match("", "1 a 0", "Estadio de Milan", "Milan", "Inter", ""),
    new Match("", "1 a 0", "Estadio de Milan", "Milan", "Inter", "")
  ];

  constructor() { }

  ngOnInit() {
  }

}
