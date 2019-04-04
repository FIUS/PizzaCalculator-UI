import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { safeUnsubscribe } from '../util/util';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit, OnDestroy {

  @Input() isAdmin: boolean;
  @Input() token = '';

  subVoteMode: Subscription;
  subParam: Subscription;
  subPizzas: Subscription;

  voteMode;

  teamName: string;
  pizzas: any[];

  constructor(private apiService: ApiService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subPizzas = this.apiService.getPizzas(this.teamName).subscribe(val => {
        this.pizzas = val;
      });

      this.subVoteMode = this.apiService.getVoteMode(this.teamName).subscribe(val => {
        this.voteMode = val.voteMode;

        if (this.voteMode === 'registration') {
          // TODO subscribe/poll
        }
      });

    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subParam);
    safeUnsubscribe(this.subVoteMode);
    safeUnsubscribe(this.subPizzas);
  }

}
