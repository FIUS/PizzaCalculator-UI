import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {

  subTemplates: Subscription;

  constructor(private apiService: ApiService) { }

  templates: any[];

  ingredients = [];
  name = '';

  ngOnInit() {
    this.apiService.getTemplates().subscribe(val => {
      this.templates = JSON.parse(JSON.stringify(val));
    });
  }


  deleteTemplate(template) {
    this.templates.splice(this.templates.indexOf(template), 1);

    this.apiService.deleteTemplate(template).subscribe(val => {
      console.log(val);
    });
  }

  newTemplate() {
    console.log(this.name, this.ingredients);
    if (this.name != null && this.name !== '' && this.ingredients != null && this.ingredients.length > 0) {

      this.apiService.postTemplate(this.name, this.ingredients);
      this.ingredients = [];
    }
  }

}
