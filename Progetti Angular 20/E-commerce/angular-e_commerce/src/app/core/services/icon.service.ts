import { Injectable } from '@angular/core';
import { 
  faCartShopping, 
  faUser, 
  faRightToBracket, 
  IconDefinition,
  faHome,
  faSpinner,
  faPlus,
  faMinus,
  faFlag,
  faHeart,
  faHeartCircleCheck
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  // raggruppiamo tutte le icone che servono
  public icons: Record<string, IconDefinition> = {
    cart: faCartShopping,
    user: faUser,
    login: faRightToBracket,
    home: faHome,
    spinner: faSpinner,
    add: faPlus,
    remove:faMinus,
    flag: faFlag,
    heart: faHeart,
    checkedHeart: faHeartCircleCheck
  };
}
