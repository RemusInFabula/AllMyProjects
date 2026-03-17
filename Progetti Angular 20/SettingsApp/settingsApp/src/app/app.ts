import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from "./features/settings/settings.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SettingsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('settingsApp');
}
