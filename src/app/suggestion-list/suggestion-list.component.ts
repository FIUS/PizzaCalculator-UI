import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit, OnDestroy {

  @Input() isAdmin: boolean;

  subParam: Subscription;
  subPizzas: Subscription;

  teamName: string;
  pizzas: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subPizzas = this.apiService.getPizzas(this.teamName).subscribe(val => {
        this.pizzas = val;
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subParam);
    this.unsubscribe(this.subPizzas);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }

}
