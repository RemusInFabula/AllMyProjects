import { Component, computed, signal, OnDestroy } from '@angular/core';
import { FocusStore } from '../../core/focus-store';
import { SettingsStore } from '../../core/settings-store';
import { CommonModule } from '@angular/common';
import { Session } from '../../core/models/session.model';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [CommonModule]
})
export class TimerComponent implements OnDestroy {

  isRunning = signal(false);
  isStopped = computed(() => !this.isRunning() && this.focusStore.currentSession() !== null);
  private intervalId: any;

  constructor(
    public focusStore: FocusStore,
    public settings: SettingsStore
  ) {}

  // Countdown
  timeLeft = computed(() => {
    const session = this.focusStore.currentSession();
    return session ? session.duration - session.elapsed : 0;
  });

  // Progress bar
  progress = computed(() => {
    const session = this.focusStore.currentSession();
    return session ? (session.elapsed / session.duration) * 100 : 0;
  });

  startFocus() {
    this.start('focus', this.settings.focusDuration());
  }

  startBreak() {
    this.start('break', this.settings.breakDuration());
  }
  resume(session:Session) {
    this.start(session.type, session.duration -session.elapsed);
  }

  private start(type: 'focus' | 'break', duration: number) {
    this.focusStore.startSession(type, duration);
    this.isRunning.set(true);

    this.intervalId = setInterval(() => {
      this.focusStore.currentSession.update(session => {
        if (!session) return null;

        const updated = {
          ...session,
          elapsed: session.elapsed + 1
        };

        if (updated.elapsed >= updated.duration) {
          this.stop();
          this.focusStore.endSession();
        }

        return updated;
      });
    }, 1000);
  }

  pause() {
    this.stop();
  }

  reset() {
    this.stop();
    this.focusStore.endSession();
  }

  private stop() {
    this.isRunning.set(false);
    clearInterval(this.intervalId);
  }

  formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    // localStorage.removeItem('sessions');
    // localStorage.removeItem('settings');
  }
}