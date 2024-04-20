import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, lastValueFrom, observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from './localStorage.service';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
    // @Inject(DOCUMENT) private document: Document
  ) {
    // const localStorage = document.defaultView?.localStorage;
  }


  api = "/api/Identity/"
<<<<<<< Updated upstream
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8',)

  login(body: EmailAndPasswodr): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + this.api + "login", body, { headers: this.headers }).pipe(map(token => {
=======
  

  login(body: EmailAndPasswodr): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + this.api + "login", body).pipe(map(token => {
>>>>>>> Stashed changes
      this.setSession(token);
      this.setClaims(token);
      return token;
    }))
  };
  register(body: EmailAndPasswodr): Observable<any> {
<<<<<<< Updated upstream
    return this.http.post<Token>(environment.apiUrl + this.api + "register", body, { headers: this.headers });
=======
    return this.http.post<Token>(environment.apiUrl + this.api + "register", body);
>>>>>>> Stashed changes
  };
  setClaims(token: Token){
    const decodedToken = jwtDecode<JwtPayloadCustom>(token.token);
    this.localStorageService.setItem("userId", decodedToken.userId);
    this.localStorageService.setItem("restaurantId", decodedToken.restaurantId);
  }
  isExpired(): boolean {
    let expiresInSring = this.localStorageService.getItem('expiresIn');
    if (expiresInSring) {
      let expiresIn = Date.parse(expiresInSring);
      if (Date.now() >= expiresIn) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  refreshToken() {
<<<<<<< Updated upstream
    return this.http.post<Token>(environment.apiUrl + this.api + "refresh", { token: this.getToken() }, { headers: this.headers }).subscribe(token =>{
=======
    return this.http.post<Token>(environment.apiUrl + this.api + "refresh", { token: this.getToken() }).subscribe(token =>{
>>>>>>> Stashed changes
      this.setClaims(token);
    },
    error =>{
      this.logout();
    });
  };
  setSession(authResult: Token) {
<<<<<<< Updated upstream
    let dateNow = new Date()
    // dateNow.setSeconds(dateNow.getSeconds() + authResult.expiresIn)
    this.localStorageService.setItem('token', authResult.token)
    // this.localStorageService.setItem('token', authResult.token)
    // this.localStorageService.setItem('expiresIn', dateNow.toString())
    // this.localStorageService.setItem('refreshToken', authResult.refreshToken)
=======
    this.localStorageService.setItem('token', authResult.token)
    this.setClaims(authResult);
>>>>>>> Stashed changes
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('restaurantId');
    this.router.navigate(['/']);
  }
  public getToken(): string {
    return this.localStorageService.getItem('token') ?? ""
  }

  public isLogined(): boolean {
    return this.getToken() ? true : false
  }

}

export interface JwtPayloadCustom {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  userId: string;
  restaurantId: string;
}
export interface Token {
  token: string,
}

<<<<<<< Updated upstream
// export interface Token {
//   tokenType: string,
//   token: string,
//   expiresIn: number,
//   refreshToken: string
// }

=======
>>>>>>> Stashed changes
export interface EmailAndPasswodr {
  email: string,
  password: string
}