import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { TopBarComponent } from "./features/top-bar/top-bar.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopBarComponent
],
  template: `
  <app-top-bar></app-top-bar>
  <router-outlet></router-outlet>
  `,
})
export class App {
  constructor() {}
}
