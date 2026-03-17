import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth-guard';
export const routes: Routes = [
    {path: '',loadComponent:() =>import('../../features/products/product-list/product-list.component').then(c=>c.ProductListComponent)},
    {path: 'error',loadComponent:() =>import('../../features/error/error/error.component').then(c=>c.ErrorComponent)},
    {path: 'checkout',loadComponent:() =>import('../../features/checkout/chekout.component').then(c=>c.ChekoutComponent),canActivate:[authGuard]},
    {path: 'wishList',loadComponent:() =>import('../../features/products/favorite-products/favorite-products.component').then(c=>c.FavoriteProductsComponent),canActivate:[authGuard]},
];