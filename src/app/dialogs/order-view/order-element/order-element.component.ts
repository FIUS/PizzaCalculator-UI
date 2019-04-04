import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-element',
  templateUrl: './order-element.component.html',
  styleUrls: ['./order-element.component.css']
})
export class OrderElementComponent implements OnInit {

  constructor() { }

  @Input() element;

  ngOnInit() {
  }


}
