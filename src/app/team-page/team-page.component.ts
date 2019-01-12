import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, ) { }

  subParam: Subscription;

  teamName: string;

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
