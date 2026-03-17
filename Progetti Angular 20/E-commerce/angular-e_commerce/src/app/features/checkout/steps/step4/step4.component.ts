import { Component } from '@angular/core';
import { CartComponent } from "../../../cart/cart.component";
import { Step1Component } from "../step1/step1.component";
import { Step2Component } from "../step2/step2.component";
import { Step3Component } from "../step3/step3.component";
import { CheckoutStore } from '../../../../core/services/checkout-store.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../core/services/toast.service';
import { Toast } from '../../../../core/models/toast.model';
import { CartStoreService } from '../../../../core/services/cart-store.service';
import { Router } from "@angular/router";
import { timer } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: "app-step4",
  imports: [
    CartComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    CommonModule,
    TranslatePipe
],
  templateUrl: "./step4.component.html",
  styleUrl: "./step4.component.css",
})
export class Step4Component {
  toast: Toast = { message: "", status: null, visible: false };
  cart$ = this.cartStore.cart$;
  toastMsg ='';
  constructor(
    public checkoutStore: CheckoutStore,
    private toastService: ToastService,
    private cartStore: CartStoreService,
    private router:Router,
  ) {}
  checkInvalid = () => {
    return (
      !this.checkoutStore.state().customer?.valid ||
      !this.checkoutStore.state().shipping?.valid ||
      !this.checkoutStore.state().payment?.valid
    );
  };
  confirmOrder = () => {
    this.toastService.updateToast(this.toast, 'checkout.orderConfirmed', "S");
    timer(2000).subscribe(() => {
    this.router.navigate(['']);
    this.checkoutStore.reset();
    this.cartStore.clear();
  });
  };

  back() {
    this.checkoutStore.prevStep();
  }
  reset = () => {
    this.checkoutStore.reset();
    this.router.navigate(['']);
  };
}