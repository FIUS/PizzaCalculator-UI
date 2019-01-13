import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderViewComponent } from '../dialogs/order-view/order-view.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dialog: MatDialog, ) {
    this.numberOfThings = 1;
  }

  teamName: string;
  token: string;

  subParam: Subscription;

  optionsToChoose = ['Personen', 'Stücke'];
  selectedOption = this.optionsToChoose[0];
  numberOfThings;
  vegetarian = 0;
  pork = 0;

  numberValueChanged() {
    if (this.numberOfThings < 0) {
      this.numberOfThings = 0;
    }
    if (this.vegetarian < 0) {
      this.vegetarian = 0;
    }
    if (this.pork < 0) {
      this.pork = 0;
    }
  }

  showOrderPreview() {
    const dialogRef = this.dialog.open(OrderViewComponent, { data: { teamName: this.teamName } });
  }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];
      this.token = params['hash'];
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subParam);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }

}
