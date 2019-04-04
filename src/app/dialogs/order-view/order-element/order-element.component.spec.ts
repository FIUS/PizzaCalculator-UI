import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderElementComponent } from './order-element.component';

describe('OrderElementComponent', () => {
  let component: OrderElementComponent;
  let fixture: ComponentFixture<OrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
