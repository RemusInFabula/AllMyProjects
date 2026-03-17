import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoalListComponent } from "./features/goals/goal-list.component/goal-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GoalListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
    <app-goal-list></app-goal-list>
  `

})
export class App {
  protected readonly title = signal('GoalsTracker');
}
