import { Component, Input } from '@angular/core';
import { GoalStore } from '../../../core/store/goal.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  imports: [CommonModule, FormsModule],
})
export class AddTaskComponent {
  @Input() goalId!: number;

  taskTitle = '';

  constructor(private store: GoalStore) {}

  addTask() {
    if (!this.taskTitle.trim()) return;
    this.store.addTask(this.goalId, this.taskTitle);
    this.taskTitle = '';
  }
}
