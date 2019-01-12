import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderViewComponent>) { }

  ngOnInit() {
    // TODO continue when selected endpoint is present
  }

}
