import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/core/routes/routes';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import {KeycloakService}  from './app/core/services/keycloack.service';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerInterceptor } from './app/core/interceptors/error-handler.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return provideTranslateHttpLoader({prefix:'./i18n/', suffix:'.json'});
}
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([AuthInterceptor, ErrorHandlerInterceptor])),provideRouter(routes),{
      provide: APP_INITIALIZER,
      useFactory: () => () => KeycloakService.initKeycloak(),
      multi: true
    },
   importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )],
}).catch((err) => console.error(err));
