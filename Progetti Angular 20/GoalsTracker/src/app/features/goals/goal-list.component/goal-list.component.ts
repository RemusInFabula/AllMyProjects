import { Component, OnInit } from '@angular/core';
import { GoalStore } from '../../../core/store/goal.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalCardComponent } from "../goal-card.component/goal-card.component";
import { AddGoalComponent } from "../add-goal.component/add-goal.component";

@Component({
  selector: 'app-goal-list',
  standalone: true,
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
  imports: [CommonModule, FormsModule, GoalCardComponent, AddGoalComponent]
})
export class GoalListComponent implements OnInit {

  constructor(public store: GoalStore) {}
  ngOnInit(): void {
    if (localStorage.getItem('goals')) {
      this.store.goals.set(JSON.parse(localStorage.getItem('goals')!));
    }
  }

}