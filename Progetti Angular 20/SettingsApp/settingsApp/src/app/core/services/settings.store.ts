import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsStore {

  theme = signal<'light' | 'dark'>('light');

  focusDuration = signal<number>(25);

  breakDuration = signal<number>(5);

  notificationsEnabled = signal<boolean>(true);

  constructor() {

    const saved = localStorage.getItem('settings');

    if (saved) {
      const data = JSON.parse(saved);

      this.theme.set(data.theme);
      this.focusDuration.set(data.focusDuration);
      this.breakDuration.set(data.breakDuration);
      this.notificationsEnabled.set(data.notificationsEnabled);
    }

    effect(() => {

      const settings = {
        theme: this.theme(),
        focusDuration: this.focusDuration(),
        breakDuration: this.breakDuration(),
        notificationsEnabled: this.notificationsEnabled()
      };

      localStorage.setItem('settings', JSON.stringify(settings));

    });

  }
}