import { Component, signal, computed, effect } from '@angular/core';
import { FocusStore } from '../../core/focus-store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goals',
  standalone: true,
  templateUrl: './goals.component.html',
  imports: [CommonModule, FormsModule]
})
export class GoalsComponent{
  weeklyGoal = signal<number>(10 * 60 * 60); // 10 ore
  weeklyGoalInput = signal<number>(10 * 60 * 60);
  

  constructor(public focusStore: FocusStore) {
    effect(() => {
      this.setInStorage();
    })
  }

  progress = computed(() => {
    const storedGoal = localStorage.getItem('weeklyGoal');
    const goal = storedGoal ? parseInt(storedGoal) : this.weeklyGoal();
    return this.focusStore.totalFocusTime() / goal;
  });

  updateGoal() {
    this.weeklyGoal.update(() => this.weeklyGoalInput());
  }
  setInStorage() {
    return localStorage.setItem('weeklyGoal',this.weeklyGoal().toString());
  }
}