import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subIngredients: Subscription;
  subFreeze: Subscription;

  ingredients: any;
  @Output() selected = new EventEmitter<any>();
  @Input() selectedOptions: any;

  constructor(private apiService: ApiService) { }

  changeSelected() {
    if (this.selectedOptions != null) {
      this.selected.emit(this.selectedOptions);
    }
  }

  ngOnInit() {

    this.subIngredients = this.apiService.getIngredients().subscribe(val => {
      this.ingredients = val;
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subIngredients);
    this.unsubscribe(this.subParam);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }


}
