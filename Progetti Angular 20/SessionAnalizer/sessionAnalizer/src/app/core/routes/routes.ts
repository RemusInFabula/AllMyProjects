import { Routes } from '@angular/router';
export const routes: Routes = [
    {path: 'timer',loadComponent:() =>import('../../features/timer/timer.component').then(c=>c.TimerComponent)},
    {path: 'statistics',loadComponent:() =>import('../../features/statistics/statistics.component').then(c=>c.StatisticsComponent)},
    {path: 'history',loadComponent:() =>import('../../features/history/history.component').then(c=>c.HistoryComponent)},
    {path: 'goals',loadComponent:() =>import('../../features/goals/goals.component').then(c=>c.GoalsComponent)},
];