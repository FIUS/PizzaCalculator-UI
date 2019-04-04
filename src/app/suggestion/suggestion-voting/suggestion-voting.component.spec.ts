import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionVotingComponent } from './suggestion-voting.component';

describe('SuggestionVotingComponent', () => {
  let component: SuggestionVotingComponent;
  let fixture: ComponentFixture<SuggestionVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
