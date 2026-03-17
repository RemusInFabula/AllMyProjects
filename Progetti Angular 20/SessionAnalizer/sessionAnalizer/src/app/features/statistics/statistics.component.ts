import { Component, computed } from '@angular/core';
import { FocusStore } from '../../core/focus-store';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  constructor(public focusStore: FocusStore) {}

  totalFocusTime = computed(() => this.focusStore.totalFocusTime());
  sessions = computed(() => this.focusStore.sessions());
}