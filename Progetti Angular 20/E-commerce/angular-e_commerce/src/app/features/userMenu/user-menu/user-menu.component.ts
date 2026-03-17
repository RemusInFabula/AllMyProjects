import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeycloakService } from '../../../core/services/keycloack.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  @Input() showMenu: boolean = false;
  
  user$ = KeycloakService.tokenParsed();

  constructor() { }
  logout() {
    KeycloakService.logout();
    localStorage.removeItem('cart');
    localStorage.removeItem('favourites');
    this.showMenu = false;
  }
}
