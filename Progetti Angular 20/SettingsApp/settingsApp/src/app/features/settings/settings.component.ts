import { Component } from '@angular/core';
import { SettingsStore } from '../../core/services/settings.store';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(public settings: SettingsStore) {}

}