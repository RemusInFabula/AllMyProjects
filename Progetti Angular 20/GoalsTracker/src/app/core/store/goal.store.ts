import { Injectable, signal, computed } from '@angular/core';
import { Goal } from '../../features/goals/models/goal';

@Injectable({ providedIn: 'root' })
export class GoalStore {
  goals = signal<Goal[]>([]);

  addGoal(title: string) {
    const newGoal: Goal = {
      id: Date.now(),
      title,
      tasks: [],
    };

    this.goals.update((g) => [...g, newGoal]);
    localSetGoals(this.goals());
  }

  addTask(goalId: number, title: string) {
    this.goals.update((goals) =>
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: [
              ...goal.tasks,
              {
                id: Date.now(),
                title,
                completed: false,
              },
            ],
          };
        }
        return goal;
      }),
    );
    localSetGoals(this.goals());
  }

  toggleTask(goalId: number, taskId: number) {
    if(localStorage.getItem('goals')) {
      this.goals.set(JSON.parse(localStorage.getItem('goals')!));
    }
    this.goals.update((goals) =>
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: goal.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task,
            ),
          };
        }

        return goal;
      }),
    );
    localSetGoals(this.goals());
  }
  goalProgress(goal: Goal) {
    const total = goal.tasks.length;
    const completed = goal.tasks.filter((t) => t.completed).length;

    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }
}
function localSetGoals(goals: Goal[]) {
      localStorage.setItem('goals', JSON.stringify(goals));
}

