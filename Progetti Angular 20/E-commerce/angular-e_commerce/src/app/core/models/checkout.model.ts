export interface CustomerInfo {
  nome: string;
  cognome:string,
  email: string;
  indirizzo: string;
  valid: boolean;
}

export interface ShippingInfo {
  method: string | undefined;
  cost: number;
  valid: boolean;
}

export interface PaymentInfo {
  cardName: string | undefined;
  cardNumber: string | undefined; // mock
  valid: boolean;
}

export interface CheckoutState {
  step: number;
  customer?: CustomerInfo;
  shipping?: ShippingInfo;
  payment?: PaymentInfo;
  valid: boolean;
}