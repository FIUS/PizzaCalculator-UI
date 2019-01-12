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

  ingredientsList: string[];

  constructor() { }

  voteUp() {
    //TODO: Implement the upvote and increment the votes: number.
  }

  ngOnChanges() {
    if (this.ingredients == null) {
      return;
    }
    if (this.ingredients.length > 4) {
      this.ingredientsList.concat(this.ingredients.slice(0, 3));
    } else if (this.ingredients.length === 4) {
      this.ingredientsList = this.ingredients;
    } else {
      this.ingredientsList.concat(this.ingredients);
      var i: number;
      for (i = this.ingredients.length; i <= 4; i++) {
        this.ingredientsList.concat("")
      }
    }
  }

}
