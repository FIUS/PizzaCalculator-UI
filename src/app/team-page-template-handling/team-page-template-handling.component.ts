import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { MatDialog } from '@angular/material';
import { safeUnsubscribe } from '../util/util';
import { TemplateListComponent } from '../dialogs/template-list/template-list.component';
import { ErrorMessageComponent } from '../dialogs/error-message/error-message.component';

@Component({
  selector: 'app-team-page-template-handling',
  templateUrl: './team-page-template-handling.component.html',
  styleUrls: ['./team-page-template-handling.component.css']
})
export class TeamPageTemplateHandlingComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subIngredients: Subscription;
  subFreeze: Subscription;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private apiService: ApiService) { }

  teamName: string;
  freeze: boolean;
  selectedOptions = [];

  ngOnInit() {

    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subFreeze = this.apiService.getFreeze(this.teamName).subscribe(val => {
        this.freeze = val.freeze;
      });
    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subIngredients);
    safeUnsubscribe(this.subParam);
    safeUnsubscribe(this.subFreeze);
  }

  openTemplates(): void {
    const dialogRef = this.dialog.open(TemplateListComponent, { data: { teamName: this.teamName } });
  }

  sendSuggestion() {

    if (this.selectedOptions != null) {
      if (this.selectedOptions.length <= 4) {
        // valid sugggestion
        this.apiService.postPizza(this.selectedOptions, this.teamName).subscribe(val => {
          this.apiService.getPizzas(this.teamName);
          this.selectedOptions = [];
        });
      } else {
        // error message
        const dialogRef = this.dialog.open(ErrorMessageComponent, {
          data: {
            message: 'Es können maximal 4 Beläge ausgewählt werden.',
          }
        });
      }
    }

  }
}
