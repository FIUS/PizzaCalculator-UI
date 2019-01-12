import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnChanges {

  @Input() name: string;
  @Input() ingredients: string[];
  @Input() votes: number;
  @Input() isAdmin: boolean;

  constructor() { }

  voteUp() {
    //TODO: Implement the upvote and increment the votes: number.
  }

  ngOnChanges() {
  }

}
