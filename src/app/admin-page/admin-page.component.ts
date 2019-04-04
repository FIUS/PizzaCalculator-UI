import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderViewComponent } from '../dialogs/order-view/order-view.component';
import { MatDialog } from '@angular/material';
import { ApiService } from '../api/api.service';
import { safeUnsubscribe } from '../util/util';

export interface SelectionItem {
  display: string;
  name: string;
}

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
  subVoteMode: Subscription;
  subFreeze: Subscription;
  subSize: Subscription;
  subVegetarian: Subscription;
  subPork: Subscription;
  subType: Subscription;

  optionsToChoose: SelectionItem[] = [{ display: 'Personen', name: 'persons' }, { display: 'Stücke', name: 'pizzaPieces' }];
  selectedOption;
  numberOfThings;
  vegetarian;
  pork;

  freeze;
  selectedMode;
  modesToSelect: SelectionItem[] = [{ display: 'normal', name: 'std' }, { display: 'registrierung', name: 'registration' }];

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

      this.apiService.getUuid();

      this.subVoteMode = this.apiService.getVoteMode(this.teamName).subscribe(val => {

        this.modesToSelect.forEach(element => {
          if (val.voteMode === element.name) {
            this.selectedMode = element;
            return;
          }
        });
      });

      this.subFreeze = this.apiService.getFreeze(this.teamName).subscribe(val => {
        this.freeze = val.freeze;
      });

      this.subSize = this.apiService.getSize(this.token).subscribe(val => {
        this.numberOfThings = Number(val.size);
      });

      this.subType = this.apiService.getType(this.token).subscribe(val => {

        this.optionsToChoose.forEach(element => {
          if (val.type === element.name) {
            this.selectedOption = element;
            return;
          }
        });
      });

      this.subVegetarian = this.apiService.getVegetarian(this.token).subscribe(val => {
        this.vegetarian = val.vegetarian;
      });

      this.subPork = this.apiService.getPork(this.token).subscribe(val => {
        this.pork = val.noPork;
      });
    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subParam);
    safeUnsubscribe(this.subVoteMode);
    safeUnsubscribe(this.subFreeze);
    safeUnsubscribe(this.subVegetarian);
  }

  save() {
    const subSize = this.apiService.patchSize(this.token, this.numberOfThings).subscribe(val => {
      safeUnsubscribe(subSize)
    });
    const subType = this.apiService.patchType(this.token, this.selectedOption).subscribe(val => {
      safeUnsubscribe(subType);
    });
    const subVeg = this.apiService.patchVegetarian(this.token, this.vegetarian).subscribe(val => {
      safeUnsubscribe(subVeg);
    });
    const subPork = this.apiService.patchPork(this.token, this.pork).subscribe(val => {
      safeUnsubscribe(subPork);
    });
    const subMode = this.apiService.patchVoteMode(this.token, this.selectedMode).subscribe(val => {
      safeUnsubscribe(subMode);
    });
    const subFr = this.apiService.patchFreeze(this.token, this.freeze).subscribe(val => {
      safeUnsubscribe(subFr);
    });
  }

  copyToClipBoard() {
    const text = 'http://' + this.apiService.getHostAddress() + 'teams/' + this.teamName;

    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
