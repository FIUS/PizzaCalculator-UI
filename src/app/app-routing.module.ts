import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'team/:teamName', component: TeamPageComponent },
  { path: 'admin/:teamName/:hash', component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
