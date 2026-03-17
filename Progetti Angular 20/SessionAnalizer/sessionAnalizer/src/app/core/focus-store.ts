import { computed, effect, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Session } from './models/session.model';

@Injectable({
  providedIn: 'root',
})
export class FocusStore {
  sessions = signal<Session[]>([]);
  currentSession = signal<Session | null>(null);

  // Computed: ore totali di focus
  totalFocusTime = computed(() => this.sessions().reduce((acc, s) => acc + s.duration, 0));

  constructor() {
    this.loadFromStorage();
    // Salva automaticamente su LocalStorage
    effect(() => {
      localStorage.setItem('sessions', JSON.stringify(this.sessions()));
    });
  }

  startSession(type: 'focus' | 'break', duration: number) {
    const newSession: Session = {
      id: crypto.randomUUID(),
      type,
      duration,
      elapsed: 0,
      startTime: Date.now(),
      distractions: 0,
    };
    this.currentSession.set(newSession);
  }


  endSession() {
    const session = this.currentSession();
    if (session) {
      this.sessions.set([...this.sessions(), session]);
      this.currentSession.set(null);
    }
  }

  loadFromStorage() {
    const data = localStorage.getItem('sessions');
    if (data) {
      this.sessions.set(JSON.parse(data));
    }
  }
  resume() {
    const newSession: Session = {
      id: this.currentSession()!.id,
      type:this.currentSession()!.type,
      duration:this.currentSession()!.duration,
      elapsed: this.currentSession()!.elapsed,
      startTime: this.currentSession()!.startTime,
      distractions: this.currentSession()!.distractions,
    };
    this.currentSession.set(newSession);
  }
}
