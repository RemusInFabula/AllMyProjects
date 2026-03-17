import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from "../../cart/cart.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-viewer',
  imports: [CartComponent, CommonModule],
  templateUrl: './cart-viewer.component.html',
  styleUrl: './cart-viewer.component.css'
})
export class CartViewerComponent {
@Input() isOpen: boolean = false;
@Output() closedFromViewer = new  EventEmitter<void>();

closeViewer() {
  this.closedFromViewer.emit();
}
}