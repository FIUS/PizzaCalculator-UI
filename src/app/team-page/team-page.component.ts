import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderViewComponent } from '../dialogs/order-view/order-view.component';
import { MatDialog } from '@angular/material';
import { ApiService } from '../api/api.service';


@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private apiService: ApiService) { }

  subParam: Subscription;

  teamName: string;

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];

      this.apiService.getUuid();
    });

  }

  ngOnDestroy() {
    this.unsubscribe(this.subParam);
  }

  showOrderPreview() {
    const dialogRef = this.dialog.open(OrderViewComponent, { data: { teamName: this.teamName } });
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }
}
