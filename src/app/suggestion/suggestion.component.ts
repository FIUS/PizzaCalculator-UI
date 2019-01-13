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
  subVoteMode: Subscription;

  @Input() name: string;
  @Input() ingredients: string[];
  votes: number;
  @Input() isAdmin: boolean;
  @Input() token: string;

  voted;
  voteMode;
  requiredPieces;
  totalPieces;

  teamName: string;

  seperator = '/#$';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  voteUp() {

    const currentState = localStorage.getItem(this.teamName + this.seperator + this.name);

    if (currentState == null || currentState !== 'up') {
      // call upvote
      const sub = this.apiService.vote(this.name, this.teamName, true).subscribe(val => {

        sub.unsubscribe();
        localStorage.setItem(this.teamName + this.seperator + this.name, 'up');
        this.voted = true;

        this.apiService.getPizzaVote(this.name, this.teamName);
      });
    }
  }

  voteDown() {
    const currentState = localStorage.getItem(this.teamName + this.seperator + this.name);

    if (this.voted === true && currentState === 'up') {
      // call down vote
      const sub = this.apiService.vote(this.name, this.teamName, false).subscribe(val => {

        sub.unsubscribe();
        localStorage.setItem(this.teamName + this.seperator + this.name, 'none');
        this.voted = false;

        this.apiService.getPizzaVote(this.name, this.teamName);
      });
    }
  }

  delete() {

    const sub = this.apiService.deletePizza(this.name, this.token).subscribe(val => {

      console.log(val);
      sub.unsubscribe();
      localStorage.setItem(this.teamName + this.seperator + this.name, 'none');

      this.apiService.getPizzas(this.teamName);
    });
  }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subVote = this.apiService.getPizzaVote(this.name, this.teamName).subscribe(val => {
        this.votes = JSON.parse(JSON.stringify(val)).vote;
      });

      this.subVoteMode = this.apiService.getVoteMode(this.teamName).subscribe(val => {
        this.voteMode = val.voteMode;

        if (this.voteMode === 'registration') {
          // TODO subscribe
        }


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
    if (this.subVoteMode != null) {
      this.subVoteMode.unsubscribe();
    }
  }

  ngOnChanges() {
    if (this.name != null) {
      this.voted = localStorage.getItem(this.teamName + this.seperator + this.name) === 'up';
    }
  }


  sendRequired() {
    this.apiService.postRequiredPieces(this.name, this.teamName, this.requiredPieces).subscribe(val => {
      console.log(val);
    });
  }

}
