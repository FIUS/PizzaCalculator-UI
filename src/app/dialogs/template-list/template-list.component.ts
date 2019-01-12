import { Component, OnInit, OnDestroy, OnChanges, Inject } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit, OnDestroy {

  subParam: Subscription;
  subTemplates: Subscription;

  teamName: string;
  templates;

  constructor(private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teamName = data.teamName;
  }

  ngOnInit() {

    this.subTemplates = this.apiService.getTemplates().subscribe(val => {
      console.log(val);
      this.templates = val;
    });
  }

  ngOnDestroy() {
    this.unsubscribe(this.subParam);
    this.unsubscribe(this.subTemplates);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription != null) {
      subscription.unsubscribe();
    }
  }

  select(template) {
    this.apiService.postTemplates(template, this.teamName).subscribe(val => {
      this.apiService.getPizzas(this.teamName);
    });
  }

}
