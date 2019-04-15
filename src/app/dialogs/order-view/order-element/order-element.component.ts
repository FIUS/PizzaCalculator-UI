import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-order-element',
  templateUrl: './order-element.component.html',
  styleUrls: ['./order-element.component.css']
})
export class OrderElementComponent implements OnChanges {

  constructor() { }

  @Input() element;
  hasName: boolean;
  hasIngredients: boolean;

  ngOnChanges() {
    this.hasName = isNaN(this.element.name);
    this.hasIngredients = this.element.ingredients.length > 0;
  }


}
