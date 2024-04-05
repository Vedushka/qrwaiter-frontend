import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8',);
  url = environment.apiUrl + "/api/restaurant/";
  constructor(
    private http: HttpClient,
  ) { }
  updateRestaurant(body: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.url, body, { headers: this.headers });
  };
  getRestaurant(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url, { headers: this.headers });
  };
}

export interface Restaurant {
  id: string;
  idUser: string;
  name: string;
  description: string;
  companyName: string;
  address: {
      street: string;
      buildingNumber: string;
      zipCode: string;
      city: string;
  };
  notifyMe: boolean;
  isDeleted: boolean;
  timeZoneMinutes: number;
}
