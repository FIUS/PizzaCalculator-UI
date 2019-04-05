import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { safeUnsubscribe } from '../util/util';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subIngredients: Subscription;
  subFreeze: Subscription;

  ingredients: any[] = [];
  @Output() selected = new EventEmitter<any>();
  @Input() selectedOptions: any[] = [];

  constructor(private apiService: ApiService) { }

  changeSelected() {
    if (this.selectedOptions != null) {
      this.selected.emit(this.selectedOptions);
    }
  }

  ngOnInit() {

    this.subIngredients = this.apiService.getIngredients().subscribe(val => {
      this.ingredients = JSON.parse(JSON.stringify(val));
    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subIngredients);
    safeUnsubscribe(this.subParam);
  }

}
