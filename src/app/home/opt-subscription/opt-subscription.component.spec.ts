import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptSubscriptionComponent } from './opt-subscription.component';

describe('OptSubscriptionComponent', () => {
  let component: OptSubscriptionComponent;
  let fixture: ComponentFixture<OptSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
