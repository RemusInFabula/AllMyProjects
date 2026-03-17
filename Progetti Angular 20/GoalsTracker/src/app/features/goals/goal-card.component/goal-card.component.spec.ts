import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCardComponent } from './goal-card.component';

describe('GoalCardComponent', () => {
  let component: GoalCardComponent;
  let fixture: ComponentFixture<GoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
