import { Router } from "@angular/router";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { ErrorService } from "../services/error-service";
import { inject } from "@angular/core";
export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);
  const handleServerError = (error: HttpErrorResponse): void => {
    switch (error.status) {
      case 401:
        // non autorizzato
        break;

      case 403:
        // accesso vietato
        console.log("Accesso negato");
        break;
      case 404:
        // non trovato
        console.log("Url non trovata");
        break;

      case 500:
        console.log("Errore interno server");
        break;

      default:
        console.log(`Errore HTTP ${error.status}`);
    }
  };
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
        errorService.notifyError(error);
        router.navigate(["error"]);
      } else {
        handleServerError(error);
        errorService.notifyError(error);
        router.navigate(["error"]);
      }
      return throwError(() => error);
    }),
  );
};
