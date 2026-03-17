export interface Session {
  id: string;
  type: 'focus' | 'break';
  duration: number;
  elapsed: number;
  startTime: number;
  distractions: number;
}