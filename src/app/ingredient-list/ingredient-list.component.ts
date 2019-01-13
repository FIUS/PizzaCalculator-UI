import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ErrorMessageComponent } from '../dialogs/error-message/error-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TemplateListComponent } from '../dialogs/template-list/template-list.component';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subIngredients: Subscription;
  subFreeze: Subscription;

  teamName: string;

  freeze: boolean;
  ingredients: any;
  selectedOptions: any;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private apiService: ApiService) { }

  send() {
    if (this.selectedOptions != null) {
      if (this.selectedOptions.length <= 4) {
        // valid sugggestion
        this.apiService.postPizza(this.selectedOptions, this.teamName).subscribe(val => {
          this.apiService.getPizzas(this.teamName);
          console.log(val);
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

  openTemplates(): void {
    const dialogRef = this.dialog.open(TemplateListComponent, { data: { teamName: this.teamName } });
  }

  ngOnInit() {

    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subFreeze = this.apiService.getFreeze(this.teamName).subscribe(val => {
        this.freeze = val.freeze;
      });
    });

    this.subIngredients = this.apiService.getIngredients().subscribe(val => {
      this.ingredients = val;
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subIngredients);
    this.unsubscribe(this.subParam);
    this.unsubscribe(this.subFreeze);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }


}
