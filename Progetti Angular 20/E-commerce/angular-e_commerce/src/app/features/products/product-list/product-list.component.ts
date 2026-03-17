import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { CartStoreService } from '../../../core/services/cart-store.service';
import { ProductStoreService } from '../../../core/services/product-store.service';
import { Product } from '../../../core/models/product.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Toast } from '../../../core/models/toast.model';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { FavouritesService } from '../../../core/services/favourites.service';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconService } from '../../../core/services/icon.service';

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    ProductSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    FontAwesomeModule,
  ],
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  toast: Toast = { message: "", status: null, visible: false };
  toastAddMsg = "";
  icons = this.icon.icons;
  @Input() onlyFav: boolean = false;

  private destroyRef = inject(DestroyRef);
  constructor(
    private cartStore: CartStoreService,
    private productStore: ProductStoreService,
    private toastService: ToastService,
    private favouritesService: FavouritesService,
    private icon: IconService,
  ) {}

  ngOnInit(): void {
    this.productStore.products$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: Product[]) => {
        if(!this.onlyFav){
        this.products = products;
        this.filtered = products;
        } else {
          const favIds = this.favouritesService.getFavouritesValue();
          this.products = products.filter(p => favIds.includes(p.id));
          this.filtered = this.products;
        }
        if (this.filtered.length > 0) {
          this.changeFavoriteStatus(
            0,
            this.favouritesService.getFavouritesValue(),
          );
        }
      });
    this.productStore.loadProducts();
  }

  addToCart(product: Product) {
    this.cartStore.add(product);
    this.toastService.updateToast(this.toast, "cart.add", "S");
  }

  onSearch(value: string) {
    this.filtered = this.products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase()),
    );
    if (this.filtered.length > 0) {
      this.changeFavoriteStatus(0, this.favouritesService.getFavouritesValue());
    }
  }
  changeFavoriteStatus(productId: number, favouriteList?: number[]) {
    if (
      favouriteList &&
      favouriteList.find((id) => this.filtered.some((p) => p.id === id))
    ) {
      this.filtered = this.filtered.map((p) => {
        if (favouriteList.includes(p.id)) {
          return { ...p, isFavourite: true };
        }
        return p;
      });
    } else {
      this.filtered = this.filtered.map((p) => {
        if (p.id === productId) {
          return { ...p, isFavourite: !p.isFavourite };
        }
        return p;
      });
    }
  }
  addFavourite(productId: number) {
    if (this.filtered.find((p) => p.id === productId)?.isFavourite) {
      this.favouritesService.removeFavourite(productId);
      this.removeOnlyFav(productId);
    } else {
      this.favouritesService.addFavourite(productId);
    }
    this.changeFavoriteStatus(productId);
  }
  removeOnlyFav(productId: number) {
    if(this.onlyFav){
      this.products = this.products.filter(p => p.id !== productId);
      this.filtered = this.filtered.filter(p => p.id !== productId);
    }
  }
}
