import {Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router, UrlTree } from "@angular/router";
import {KeycloakService} from "../services/keycloack.service";
@Injectable({ providedIn: "root" })
export class authGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(): boolean | UrlTree {
    const kc = KeycloakService.getKeycloak();

    if (!kc?.authenticated) {
      kc?.login();
      localStorage.removeItem('cart');
      localStorage.removeItem('favourites'); 
      return false;
    } else if(!localStorage.getItem('cart')){
      return this.router.createUrlTree(['']);
    }

    return true;
  }
}
