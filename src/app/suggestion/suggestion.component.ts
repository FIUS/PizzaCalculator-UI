import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  @Input() suggestion: any;

  constructor() { }

  ngOnInit() {
  }

}
