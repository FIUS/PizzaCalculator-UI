import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { safeUnsubscribe } from 'src/app/util/util';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit, OnDestroy {

  subTemplates: Subscription;

  teamName: string;
  templates;

  constructor(private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teamName = data.teamName;
  }

  ngOnInit() {

    this.subTemplates = this.apiService.getTemplates().subscribe(val => {
      this.templates = val;
    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subTemplates);
  }


  select(template) {
    const subTemp = this.apiService.postTemplates(template, this.teamName).subscribe(val => {
      this.apiService.getPizzas(this.teamName);
      safeUnsubscribe(subTemp);
    });
  }

}
