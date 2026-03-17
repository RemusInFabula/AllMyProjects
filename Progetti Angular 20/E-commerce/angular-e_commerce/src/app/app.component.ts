import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopBarComponent } from "./features/top-bar-utilities/top-bar/top-bar.component";
import { RouterOutlet } from "@angular/router";
import { ToastComponent } from "./features/toast/toast.component";
import { ToastService } from "./core/services/toast.service";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TopBarComponent,
    RouterOutlet,
    ToastComponent,
  ],
  template: `
    <app-toast *ngIf="toast$ | async as toast" [toastObj]="toast"></app-toast>
    <div class="container mx-auto p-6">
      <app-top-bar></app-top-bar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(
    private toastService: ToastService,
  ) {}
  toast$ = this.toastService.toast$;
}
