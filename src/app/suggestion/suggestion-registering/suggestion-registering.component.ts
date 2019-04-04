import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Subscription } from 'rxjs';
import { safeUnsubscribe } from 'src/app/util/util';

@Component({
  selector: 'app-suggestion-registering',
  templateUrl: './suggestion-registering.component.html',
  styleUrls: ['./suggestion-registering.component.css']
})
export class SuggestionRegisteringComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  subParam: Subscription;
  subMyPieces: Subscription;
  subAllPieces: Subscription;

  @Input() name: string;
  @Input() ingredients: string[];
  @Input() isAdmin: boolean;
  @Input() token: string;


  requiredPieces;
  totalPieces;

  teamName: string;

  seperator = '/#$';

  ngOnInit() {
    this.subParam = this.route.params.subscribe(params => {
      this.teamName = params['teamName'];
      this.ngOnChanges();
    });
  }

  delete() {

    const sub = this.apiService.deletePizza(this.name, this.token).subscribe(val => {

      sub.unsubscribe();
      localStorage.setItem(this.teamName + this.seperator + this.name, 'none');

      this.apiService.getPizzas(this.teamName);
    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subParam);
    safeUnsubscribe(this.subMyPieces)
    safeUnsubscribe(this.subAllPieces);
  }

  ngOnChanges() {
    
    if (this.name != null && this.teamName != null) {

      safeUnsubscribe(this.subMyPieces);
      this.subMyPieces = this.apiService.getMyPiecesOfPizza(this.name, this.teamName).subscribe(val => {
        console.log('my', val);
        // TODO set requiredPieces
      });

      safeUnsubscribe(this.subAllPieces);
      this.subAllPieces = this.apiService.getAllPiecesOfPizza(this.name, this.teamName).subscribe(val => {
        this.totalPieces = (val as any).total;
      });
    }
  }

  sendRequired() {
    this.apiService.postRequiredPieces(this.name, this.teamName, this.requiredPieces).subscribe(val => {
      console.log(val);
    });
  }
}
