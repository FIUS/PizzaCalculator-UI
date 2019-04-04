import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Subscription } from 'rxjs';
import { safeUnsubscribe } from 'src/app/util/util';

@Component({
  selector: 'app-suggestion-voting',
  templateUrl: './suggestion-voting.component.html',
  styleUrls: ['./suggestion-voting.component.css']
})
export class SuggestionVotingComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subVote: Subscription;

  @Input() name: string;
  @Input() ingredients: string[];
  @Input() isAdmin: boolean;
  @Input() token: string;
  @Input() votes;

  voted;

  teamName: string;

  seperator = '/#$';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  voteUp() {

    const currentState = localStorage.getItem(this.teamName + this.seperator + this.name);

    if (currentState == null || currentState !== 'up') {
      // call upvote
      const sub = this.apiService.vote(this.name, this.teamName, true).subscribe(val => {

        console.log(val);
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

      // call back from params is slow enough for the name to be injected
      this.voted = localStorage.getItem(this.teamName + this.seperator + this.name) === 'up';
    });

  }

  ngOnDestroy() {
    safeUnsubscribe(this.subParam);
    safeUnsubscribe(this.subVote);
  }
}
