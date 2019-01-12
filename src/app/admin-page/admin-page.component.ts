import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  teamName: string;
  subParam: Subscription;

  numberOfThings = 1;
  optionsToChoose = ['Personen', 'Stücke'];
  selectedOption = this.optionsToChoose[0];

  numberValueChanged() {
    if (this.numberOfThings < 0) {
      this.numberOfThings = 0;
    }
  }

  showOrderPreview() {

  }

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];
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
