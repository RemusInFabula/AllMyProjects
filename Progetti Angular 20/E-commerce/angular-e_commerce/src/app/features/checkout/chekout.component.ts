import { Component, computed } from '@angular/core';
import { Step1Component } from "./steps/step1/step1.component";
import { CheckoutStore } from '../../core/services/checkout-store.service';
import { CommonModule } from '@angular/common';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step4Component } from './steps/step4/step4.component';
@Component({
  selector: 'app-chekout.component',
  imports: [Step1Component, CommonModule, Step2Component,Step3Component, Step4Component],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.css'
})
export class ChekoutComponent {
  constructor(private checkoutStore:CheckoutStore) {}
  step = computed(() => this.checkoutStore.step());
}
