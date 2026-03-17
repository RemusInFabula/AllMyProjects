import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutStore } from '../../../../core/services/checkout-store.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-step3',
  imports: [ReactiveFormsModule,CommonModule,TranslatePipe],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  @Input() isDetail: boolean = false;
  constructor(private checkoutStore: CheckoutStore,private fb:FormBuilder) {}

  paymentForm = this.fb.nonNullable.group({
    cardName:[this.checkoutStore.getPayment()?.cardName,[Validators.required,Validators.minLength(4)]],
    cardNumber:[this.checkoutStore.getPayment()?.cardNumber,[Validators.required,Validators.minLength(16),Validators.maxLength(16)]]
  });

  next() {
    this.checkoutStore.setPayment({
      cardName: this.paymentForm.value.cardName ?? '',
      cardNumber:this.paymentForm.value.cardNumber ?? '',
      valid: this.paymentForm.valid
    });
    this.checkoutStore.nextStep();
  }

  back() {
    this.checkoutStore.prevStep();
  }
  setValidity = () => {
    this.checkoutStore.setPayment({
      cardName: this.paymentForm.value.cardName ?? '',
      cardNumber:this.paymentForm.value.cardNumber ?? '',
      valid: this.paymentForm.valid
    });
    }
}