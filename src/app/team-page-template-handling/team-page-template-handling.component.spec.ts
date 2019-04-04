import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPageTemplateHandlingComponent } from './team-page-template-handling.component';

describe('TeamPageTemplateHandlingComponent', () => {
  let component: TeamPageTemplateHandlingComponent;
  let fixture: ComponentFixture<TeamPageTemplateHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPageTemplateHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPageTemplateHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
