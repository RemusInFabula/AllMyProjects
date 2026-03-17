import { Component } from '@angular/core';
import { FocusStore } from '../../core/focus-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  imports: [CommonModule]
})
export class HistoryComponent {
  constructor(public focusStore: FocusStore) {}
}