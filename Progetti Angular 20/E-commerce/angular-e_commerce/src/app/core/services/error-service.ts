import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorSubject = new BehaviorSubject<HttpErrorResponse | null>(null);
  error$ = this.errorSubject.asObservable();
  constructor() { }
  notifyError = (error:HttpErrorResponse) => {
    this.errorSubject.next(error);
  }
  clear = () => {
    this.errorSubject.next(null);
  }
}
