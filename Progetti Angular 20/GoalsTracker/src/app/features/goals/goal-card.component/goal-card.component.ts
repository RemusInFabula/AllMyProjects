import { Component, Input } from '@angular/core';
import { Goal } from '../models/goal';
import { GoalStore } from '../../../core/store/goal.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from "../add-task.component/add-task.component";

@Component({
  selector: 'app-goal-card',
  standalone: true,
  templateUrl: './goal-card.component.html',
  styleUrl: './goal-card.component.css',
  imports: [CommonModule, FormsModule, AddTaskComponent]
})
export class GoalCardComponent {

  @Input() goal!: Goal;

  constructor(public store: GoalStore) {}

}