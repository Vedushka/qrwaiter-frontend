import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './localStorage.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import {WaiterDTO} from "./table.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }
  api = "/api/Notification/";
  getDevice(token : string): Observable<WaiterDTO> {
    return this.http.get<WaiterDTO>(environment.apiUrl + this.api + "waiter/" + token);
  };
  addDevice(body: WaiterDTO): Observable<any> {
    return this.http.post<WaiterDTO>(environment.apiUrl + this.api + "waiter", body);
  };
  addDeviceToQrCode(body: DeviceAndQrCodeDTO, onlyThisDevice: boolean = false): Observable<any> {
    let params = new HttpParams().set("onlyThisDevice", onlyThisDevice);
    return this.http.post<DeviceAndQrCodeDTO>(environment.apiUrl + this.api + "addDeviceToQrCode", body, {params: params});
  };
  unsubscribeDeviceFromAllQrCodes(deviceToken : string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.api + "unsubscribeDeviceFromAllQrCodes/" + deviceToken);
  };
  unsubscribeDeviceFromQrCode(deviceToken : string, waiterLink : string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.api + `unsubscribeDeviceFromQrCode/${deviceToken}/${waiterLink}` );
  };

  callWaiter(link : string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.api + `callWaiter/${link}` );
  };
}


export interface DeviceAndQrCodeDTO
{
  deviceToken : string,
  name: string,
  link: string,
}
