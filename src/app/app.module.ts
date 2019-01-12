import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatMenuModule,
  MatIconModule, MatListModule, MatSidenavModule, MatDialogModule, MatToolbarModule,
  MatTooltipModule, MatTableModule, MatInputModule, MatTabsModule, MatChipsModule, MatSlideToggleModule, MatSelectModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FooterComponent } from './footer/footer.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { ErrorMessageComponent } from './dialogs/error-message/error-message.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { TemplateListComponent } from './dialogs/template-list/template-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TeamPageComponent,
    AdminPageComponent,
    FooterComponent,
    SuggestionComponent,
    ErrorMessageComponent,
    SuggestionListComponent,
    IngredientListComponent,
    TemplateListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // material
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  entryComponents: [
    // dialogs
    ErrorMessageComponent,
    TemplateListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
