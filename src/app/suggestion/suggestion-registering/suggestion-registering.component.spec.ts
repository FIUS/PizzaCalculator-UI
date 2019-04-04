import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionRegisteringComponent } from './suggestion-registering.component';

describe('SuggestionRegisteringComponent', () => {
  let component: SuggestionRegisteringComponent;
  let fixture: ComponentFixture<SuggestionRegisteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionRegisteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionRegisteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
