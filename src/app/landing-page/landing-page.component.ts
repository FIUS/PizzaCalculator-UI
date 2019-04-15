import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  subTeams: Subscription;

  // new team
  teamTypingInput: string;
  publicTeam = false;

  // join an existing team
  teamNameFormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  teams;


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.subTeams = this.apiService.getTeams().subscribe(val => {
      this.teams = val;

      this.apiService.getUuid();

      this.filteredOptions = this.teamNameFormControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });

  }

  ngOnDestroy() {
    if (this.subTeams != null) {
      this.subTeams.unsubscribe();
    }
  }

  createTeam() {
    if (this.teamTypingInput !== '' && this.teamTypingInput != null) {

      this.apiService.postTeam(this.teamTypingInput, this.publicTeam).subscribe(val => {
        this.router.navigate(['/admin', val.name, val.hashedName]);
      });

    }
  }

  goToTeam() {
    if (this.teamNameFormControl.value !== '' && this.teamNameFormControl.value != null) {
      this.router.navigate(['/team/', this.teamNameFormControl.value]);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.toLowerCase().includes(filterValue));
  }
}
