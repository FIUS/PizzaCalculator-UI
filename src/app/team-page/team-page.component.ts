import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorMessageComponent } from '../dialogs/error-message/error-message.component';


@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private dialog: MatDialog, ) { }

  subParam: Subscription;
  subIngredients: Subscription;
  subPizzas: Subscription;

  teamName: string;
  ingredients: any;
  pizzas: any;


  selectedOptions: any;

  onNgModelChange(e) {
  }

  send() {
    if (this.selectedOptions != null) {
      if (this.selectedOptions.length <= 4) {
        // valid sugggestion
        this.apiService.postPizza(this.selectedOptions, this.teamName).subscribe(val => {
          this.apiService.getPizzas(this.teamName);
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

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.subPizzas = this.apiService.getPizzas(this.teamName).subscribe(val => {
        console.log(val);
        this.pizzas = val;
      });
    });

    this.subIngredients = this.apiService.getIngredients().subscribe(val => {
      this.ingredients = val;
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subParam);
    this.unsubscribe(this.subIngredients);
    this.unsubscribe(this.subPizzas);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }

  openTemplates(): void {

  }
}
