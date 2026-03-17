import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import translationsIT from "../../../../../public/i18n/it.json";
import translationsEN from "../../../../../public/i18n/en.json";
import translationDE from "../../../../../public/i18n/de.json";

@Component({
  selector: 'app-change-language',
  imports: [],
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.css', '../../../../../public/i18n/flag-icons.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLanguageComponent implements OnInit{
  class = '';
  hasClass = false;
  currentLanguage: string = '';
  constructor(private translate:TranslateService) {}
  ngOnInit(): void {
    this.hasClass = true;
    switch(localStorage.getItem('lang')){
      case 'it':
      this.translate.setTranslation("it", translationsIT);
      this.translate.setFallbackLang("it");
      this.currentLanguage = 'it';
      break;
      case 'en':
      this.translate.setTranslation("en", translationsEN);
      this.translate.setFallbackLang("en");
      this.currentLanguage = 'en';
      break;
      case 'de':
      this.translate.setTranslation("de", translationDE);
      this.translate.setFallbackLang("de");
      this.currentLanguage = 'de';
      break;
      default:
      this.translate.setTranslation("it", translationsIT);
      this.translate.setFallbackLang("it");
      this.currentLanguage = 'it';
      localStorage.setItem('lang', 'it');
      break;
    }
  }
  changeLanguage = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    this.currentLanguage = value;
    localStorage.setItem('lang', value);
    switch(value){
      case 'it':
      this.translate.setTranslation("it", translationsIT);
      this.translate.setFallbackLang("it");
      break;
      case 'de':
      this.translate.setTranslation("de", translationDE);
      this.translate.setFallbackLang("de");
      break;
      case 'en':
      this.translate.setTranslation("en", translationsEN);
      this.translate.setFallbackLang("en");
      break;
    }
  }
}
