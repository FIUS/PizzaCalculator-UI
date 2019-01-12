import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  subTeams: Subscription;

  teamTypingInput: string;
  selectedTeam: string;
  teams;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.subTeams = this.apiService.getTeams().subscribe(val => {
      this.teams = val;
    });
  }

  ngOnDestroy() {
    if (this.subTeams != null) {
      this.subTeams.unsubscribe();
    }
  }

  createTeam() {
    if (this.teamTypingInput !== '' && this.teamTypingInput != null) {

      this.apiService.postTeam(this.teamTypingInput).subscribe(val => {
        // TODO change routing to admin page with hash
        this.router.navigate(['/team/', this.teamTypingInput]);
      });

    }
  }

  goToTeam() {
    if (this.selectedTeam !== '' && this.selectedTeam != null) {
      this.router.navigate(['/team/', this.selectedTeam]);
    }
  }
}
