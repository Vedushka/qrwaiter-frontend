import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  url = environment.apiUrl + "/api/QrCode/";
  constructor(
    private http: HttpClient,
  ) { }

  updateQrCode(body: QrCodeDTO): Observable<QrCodeDTO> {
    return this.http.post<QrCodeDTO>(this.url, body);
  };
  getQrCode(id: string): Observable<QrCodeDTO> {
    return this.http.get<QrCodeDTO>(this.url + id);
  };
  generateNewQrCodeLink(id: string, linkType: LinkType): Observable<QrCodeDTO> {
    return this.http.get<QrCodeDTO>(`${this.url}generateLink/${id}/${linkType}`);
  };
  getQrCodeAndTableDto(link: string, type: LinkType, deviceToken: string = ""): Observable<QrCodeAndTableDTO> {
    let params = new HttpParams().set("deviceToken", deviceToken);
    return this.http.get<QrCodeAndTableDTO>(`${this.url}QrCodeAndTableDto/${link}/${type}`, {params: params});
  };
}
export enum LinkType {
  ClientLink,
  WaiterLink
}
export interface QrCodeDTO {
  id: string;
  idTable: string;
  clientLink: string;
  waiterLink: string;
  title: string;
}
export interface QrCodeAndTableDTO {
  clientLink: string;
  waiterLink: string;
  qrTitle: string;
  tableName: string;
  tableNumber: number;
  subscribed: boolean;
}
