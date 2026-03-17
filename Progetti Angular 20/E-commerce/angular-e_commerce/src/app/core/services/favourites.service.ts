import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private _favourites = new BehaviorSubject<number[]>([]); // Array di ID dei prodotti preferiti
  favourites$ = this._favourites.asObservable();
  constructor() { }
  getFavouritesValue(): number[] {
    return JSON.parse(localStorage.getItem('favourites') || '[]') || this._favourites.value;
  }
  addFavourite = (productId: number) => {
    if(!localStorage.getItem('favourites')){
    if(!this._favourites.value.includes(productId)){
      this._favourites.next([...this._favourites.value,productId]);
      localStorage.setItem('favourites',JSON.stringify(this._favourites.value));
    }
    }else {
      const currentFavourites = JSON.parse(localStorage.getItem('favourites') || '[]') || [];
      if(!currentFavourites.includes(productId)){
        const updatedFavourites = [...currentFavourites, productId];
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        this._favourites.next(updatedFavourites);
      }
    }

  }
  removeFavourite = (productId: number) => {
     if(!localStorage.getItem('favourites')){
    this._favourites.next(this._favourites.value.filter(id => id !== productId))
    localStorage.setItem('favourites',JSON.stringify(this._favourites.value));
     } else {
      const currentFavourites = JSON.parse(localStorage.getItem('favourites') || '[]') || [];
      const updatedFavourites = currentFavourites.filter((id: number) => id !== productId);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      this._favourites.next(updatedFavourites);
     }
  }
}
