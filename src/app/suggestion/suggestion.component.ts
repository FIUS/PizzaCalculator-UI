import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit, OnDestroy, OnChanges {

  subParam: Subscription;
  subVote: Subscription;

  @Input() name: string;
  @Input() ingredients: string[];
  votes: number;
  @Input() isAdmin: boolean;

  voted;

  teamName: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  voteUp() {

    const currentState = localStorage.getItem(this.name);

    if (currentState == null || currentState !== 'up') {
      // call upvote
      const sub = this.apiService.vote(this.name, this.teamName, true).subscribe(val => {

        sub.unsubscribe();
        localStorage.setItem(this.name, 'up');
        this.voted = true;

        this.apiService.getPizzaVote(this.name, this.teamName);
      });
    }
  }

  voteDown() {
    const currentState = localStorage.getItem(this.name);

    if (this.voted === true && currentState === 'up') {
      // call down vote
      const sub = this.apiService.vote(this.name, this.teamName, false).subscribe(val => {

        sub.unsubscribe();
        localStorage.setItem(this.name, 'none');
        this.voted = false;

        this.apiService.getPizzaVote(this.name, this.teamName);
      });
    }
  }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subVote = this.apiService.getPizzaVote(this.name, this.teamName).subscribe(val => {
        console.log(this.name, val);
        this.votes = JSON.parse(JSON.stringify(val)).vote;
      });
    });

  }

  ngOnDestroy() {
    if (this.subParam != null) {
      this.subParam.unsubscribe();
    }
    if (this.subVote != null) {
      this.subVote.unsubscribe();
    }
  }

  ngOnChanges() {
    if (this.name != null) {
      this.voted = localStorage.getItem(this.name) === 'up';
    }
  }

}
