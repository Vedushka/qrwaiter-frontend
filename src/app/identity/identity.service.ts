import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http: HttpClient) { }

  api = "/api/account/"
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8',)
                            //  .set('Access-Control-Allow-Origin', '*')
                            //  .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
                            //  .set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type');

  login(body: EmailAndPasswodr) : Observable<Token>{
    return this.http.post<Token>(environment.apiUrl + this.api +"login", body, {headers: this.headers});
  };
  register(body: EmailAndPasswodr) : Observable<any>{
    return this.http.post<Token>(environment.apiUrl + this.api +"register", body, {headers: this.headers});
  };

  isExpired(): boolean {
    let expiresInSring = localStorage.getItem('expiresIn');
    if(expiresInSring){
      let expiresIn = Date.parse(expiresInSring);
      if(Date.now() >= expiresIn){
        return true;
      }
      else{
        return false;
      }
    } 
    return true;
  }

  refreshToken(){
    return this.http.post<Token>(environment.apiUrl + this.api +"refresh", {refreshToken: this.getRefreshToken()}, {headers: this.headers});
  };
  setSession(authResult: Token) {
    let dateNow = new Date();
    console.dir(dateNow)
    dateNow.setSeconds(dateNow.getSeconds() + authResult.expiresIn);
    console.dir(dateNow)
    
  localStorage.setItem('accessToken', authResult.accessToken);
  localStorage.setItem('expiresIn', dateNow.toString());
  localStorage.setItem('refreshToken', authResult.refreshToken);
  }          

logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('refreshToken');
}
public getToken(){
  return localStorage.getItem('accessToken')??"";
}
public getRefreshToken(){
  return localStorage.getItem('refreshToken')??"";
}
public isLoggedIn() {
  // return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  // return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("");
    // const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
  }
}




export interface Token{
  tokenType: string,
  accessToken: string,
  expiresIn: number,
  refreshToken: string
}

export interface EmailAndPasswodr{
  email    : string,
  password : string
}