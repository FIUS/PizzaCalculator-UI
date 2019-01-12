import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  teamTypingInput: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }


  createTeam() {
    if (this.teamTypingInput !== '' && this.teamTypingInput != null) {

      // TODO call api
      this.apiService.postTeam(this.teamTypingInput).subscribe(val => {
        this.router.navigate(['/team/', this.teamTypingInput]);
      });

    }
  }
}
