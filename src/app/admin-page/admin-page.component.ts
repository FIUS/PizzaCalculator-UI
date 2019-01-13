import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderViewComponent } from '../dialogs/order-view/order-view.component';
import { MatDialog } from '@angular/material';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private apiService: ApiService) {
  }

  teamName: string;
  token: string;

  subParam: Subscription;

  optionsToChoose = ['Personen', 'Stücke'];
  selectedOption = this.optionsToChoose[0];
  numberOfThings = 1;
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

  save() {
    const subSize = this.apiService.patchSize(this.token, this.numberOfThings).subscribe(val => {
      subSize.unsubscribe();
    });
    const subType = this.apiService.patchType(this.token, this.selectedOption).subscribe(val => {
      subType.unsubscribe();
    });
    const subVeg = this.apiService.patchVegetarian(this.token, this.vegetarian).subscribe(val => {
      subVeg.unsubscribe();
    });
    const subPork = this.apiService.patchPork(this.token, this.pork).subscribe(val => {
      subPork.unsubscribe();
    });
  }

  copyToClipBoard() {
    const text = this.apiService.getHostAddress() + 'teams/' + this.teamName;
    /*
    text.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    */

    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
