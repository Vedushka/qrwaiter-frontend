import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { IdentityService } from "../services/identity.service";


export const JwtInterceptorFn: HttpInterceptorFn =

  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const identityService = inject(IdentityService);
    let token = identityService.getToken();
    if (token) {
      // if(identityService.isExpired()){
      //   identityService.refreshToken().subscribe(token => {
      //     identityService.setSession(token);
      //     req = req.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     });    
      //   })
      // }
      // else{
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // }
    return next(req).pipe(
      catchError(errorData => {
        console.dir(errorData);
        // if (errorData.status == 0) {
        //   identityService.refreshToken().add(Observable.prototype.subscribe(value => { }).unsubscribe())
        //   let token = identityService.getToken();
        //   req = req.clone({
        //     setHeaders: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   });
        // }
        return throwError(() => errorData);
      }));
  }
