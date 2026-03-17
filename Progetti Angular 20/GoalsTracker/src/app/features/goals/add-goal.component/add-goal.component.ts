import { Component } from '@angular/core';
import { GoalStore } from '../../../core/store/goal.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-goal',
  standalone: true,
  templateUrl: './add-goal.component.html',
  imports: [CommonModule,FormsModule]
})
export class AddGoalComponent {

  title = '';
  constructor(private store: GoalStore) {}

  createGoal() {
    if (!this.title.trim()) return;
    this.store.addGoal(this.title);
    this.title = '';
  }

}