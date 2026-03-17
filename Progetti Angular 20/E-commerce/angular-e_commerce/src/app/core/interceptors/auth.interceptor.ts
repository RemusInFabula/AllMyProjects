import {
  HttpInterceptorFn,
} from '@angular/common/http';
import {KeycloakService} from '../services/keycloack.service';

export const AuthInterceptor: HttpInterceptorFn =(req,next) => {
    const token = KeycloakService.getKeycloak()?.token;

      const AuthReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next(AuthReq);
  }
