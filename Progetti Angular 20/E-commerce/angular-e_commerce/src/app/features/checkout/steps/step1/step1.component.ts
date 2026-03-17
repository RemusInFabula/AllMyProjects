import { Component, Input} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutStore } from '../../../../core/services/checkout-store.service';
import { CommonModule } from '@angular/common';
import { CustomerInfo } from '../../../../core/models/checkout.model';
import {TranslatePipe} from "@ngx-translate/core";


@Component({
  selector: "app-step1",
  imports: [ReactiveFormsModule, CommonModule,TranslatePipe],
  templateUrl: "./step1.component.html",
  styleUrl: "./step1.component.css",
})
export class Step1Component {
  @Input() isDetail: boolean = false;
  customerData:CustomerInfo  = {
    nome:'',
    cognome:'',
    email:'',
    indirizzo:'',
    valid:false
  };
  constructor(private fb: FormBuilder, private checkoutStore: CheckoutStore) {}

  customerForm = this.fb.nonNullable.group({
    nome: [this.checkoutStore.getCustomer()?.nome, [Validators.required, Validators.minLength(3)]],
    cognome: [this.checkoutStore.getCustomer()?.cognome, [Validators.required, Validators.minLength(3)]],
    email: [this.checkoutStore.getCustomer()?.email, [Validators.required, Validators.email]],
    indirizzo: [this.checkoutStore.getCustomer()?.indirizzo, [Validators.required, Validators.minLength(5)]],
  });
  onSubmit() {
    this.checkoutStore.setCustomer({
      nome: this.customerForm.value.nome ?? "",
      cognome: this.customerForm.value.cognome ?? "",
      email: this.customerForm.value.email ?? "",
      indirizzo: this.customerForm.value.indirizzo ?? "",
      valid: this.customerForm.valid
    });
    this.checkoutStore.nextStep();
  }
  setValidity = () => {
    this.checkoutStore.setCustomer({
      nome: this.customerForm.value.nome ?? "",
      cognome: this.customerForm.value.cognome ?? "",
      email: this.customerForm.value.email ?? "",
      indirizzo: this.customerForm.value.indirizzo ?? "",
      valid: this.customerForm.valid
    });
    }}
