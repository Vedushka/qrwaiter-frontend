import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IdentityService } from "./identity.service";


export const JwtInterceptorFn: HttpInterceptorFn = 

  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
  {
    const identityService = inject(IdentityService);
    let token =  identityService.getToken();
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
    return next(req);
  }
 