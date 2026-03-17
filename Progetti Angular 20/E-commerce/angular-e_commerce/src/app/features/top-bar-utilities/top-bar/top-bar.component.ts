import { Component, inject, OnInit } from "@angular/core";
import { CartViewerComponent } from "../cart-viewer/cart-viewer.component";
import { UserMenuComponent } from "../../userMenu/user-menu/user-menu.component";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { IconService } from "../../../core/services/icon.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { filter, Subscription } from "rxjs";
import { KeycloakService } from "../../../core/services/keycloack.service";
import { ChangeLanguageComponent } from "../change-language/change-language.component";
import { TranslateService } from "@ngx-translate/core";
import translationsEN from "../../../../../public/i18n/en.json";
import translationsIT from "../../../../../public/i18n/it.json";

export interface User {
  email: string;
  password: string;
  role: "user" | "admin";
}
@Component({
  selector: "app-top-bar",
  imports: [
    CartViewerComponent,
    UserMenuComponent,
    RouterLink,
    FontAwesomeModule,
    CommonModule,
    ChangeLanguageComponent
],
  templateUrl: "./top-bar.component.html",
  styleUrl: "./top-bar.component.css",
})
export class TopBarComponent implements OnInit {
  opened: boolean = false;
  showUserMenu: boolean = false;
  constructor( private icon: IconService,private translate:TranslateService) {}
  icons = this.icon.icons;
  user$ = KeycloakService.tokenParsed();
  private subscription!: Subscription;
  private router = inject(Router);
  showHomeIcon: boolean = false;
  showCartIcon: boolean = false;
  currentUrl = "";
  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.showHomeIcon = this.currentUrl !== "/";
        this.showCartIcon = this.currentUrl !== "/checkout"; //Used for login icon and cart icon
      });
    this.translate.setTranslation("it", translationsIT);
    this.translate.setFallbackLang("it");
  }
  toggleCartPreview() {
    this.showUserMenu = false;
    this.opened = !this.opened;
  }
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.opened = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
