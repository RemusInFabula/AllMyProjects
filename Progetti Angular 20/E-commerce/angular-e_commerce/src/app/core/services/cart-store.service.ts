import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../../core/models/product.model";

@Injectable({ providedIn: "root" })
export class CartStoreService {
  private _cart = new BehaviorSubject<Product[]>([]);
  cart$ = this._cart.asObservable();
  
  prepopulateCart = () => {
    if(this._cart.value.length == 0 && localStorage.getItem('cart')){
      this._cart.next(JSON.parse(localStorage.getItem('cart')|| '[]'));
    }
  }

  add(product: Product) {
    let observerItem = this._cart.value.find((p) => p.id === product.id);
    if (this._cart.value.find((p) => p.id === product.id)) {
       observerItem!.quantity = this.countProductInCart(product.id, observerItem!.quantity);
      this._cart.next([...this._cart.value]);
      return;
    } else {
      product.quantity = 1;
      this._cart.next([...this._cart.value, product]);
    }
    localStorage.setItem('cart',JSON.stringify(this._cart.value));
  }

  remove(id: number) {
    if (this._cart.value.find((p) => p.id === id)?.quantity == 1) {
      this._cart.next(this._cart.value.filter((p) => p.id !== id));
    } else {
      this._cart.value.find((p) => p.id === id)!.quantity--;
      this._cart.next([...this._cart.value]);
    }
    this._cart.value.length == 0 ? this.clear() : localStorage.setItem('cart',JSON.stringify(this._cart.value));
  }
  calculateTotal(): number {
    return parseFloat(this._cart.value.reduce(
      (sum, item) => sum + item.price * item.quantity,0).toFixed(2));
  }

  clear() {
    this._cart.next([]);
    localStorage.removeItem('cart');
  }
  countProductInCart(id: number, quantity: number): number {
    return this._cart.value.filter((product) => product.id === id) ? quantity + 1: quantity;
  }
  getCartValue(): Product[] {
    return this._cart.value;
  }
}
