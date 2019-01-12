import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  @Input() name: string;
  @Input() ingredients: string[];
  @Input() votes: number;

  constructor() { }

  voteUp() {
    //TODO: Implement the upvote and increment the votes: number.
  }

  ngOnInit() {
  }

}
