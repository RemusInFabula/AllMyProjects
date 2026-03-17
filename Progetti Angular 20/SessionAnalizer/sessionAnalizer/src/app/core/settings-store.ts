import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {
  theme = signal<'light' | 'dark'>('light');
  focusDuration = signal<number>(1 * 60);
  breakDuration = signal<number>(15 * 60);
  notificationsEnabled = signal(true);

  constructor() {
    const data = localStorage.getItem('settings');
    if (data) {
      const parsed = JSON.parse(data);

      // ⚠ CORREZIONE IMPORTANTE
      this.theme.set(parsed.theme ?? 'light');
      this.focusDuration.set(parsed.focusDuration ?? 1 * 60);
      this.breakDuration.set(parsed.breakDuration ?? 15 * 60);
      this.notificationsEnabled.set(parsed.notificationsEnabled ?? true);
    }

    effect(() => {
      localStorage.setItem(
        'settings',
        JSON.stringify({
          theme: this.theme(),
          focusDuration: this.focusDuration(),
          breakDuration: this.breakDuration(),
          notificationsEnabled: this.notificationsEnabled(),
        })
      );
    });
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  updateDuration(type: 'focus' | 'break', value: number) {
    if (type === 'focus') this.focusDuration.set(value);
    else this.breakDuration.set(value);
  }

  toggleNotifications() {
    this.notificationsEnabled.set(!this.notificationsEnabled());
  }
}