import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
    headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8',);
    url = environment.apiUrl + "/api/qrCode/";
    constructor(
      private http: HttpClient,
    ) { }

    updateQrCode(body: QrCodeDTO): Observable<QrCodeDTO> {
      return this.http.post<QrCodeDTO>(this.url, body, { headers: this.headers });
    };
    getQrCode(id: string): Observable<QrCodeDTO> {
      return this.http.get<QrCodeDTO>(this.url + id, { headers: this.headers });
    };
    generateNewQrCodeLink(id: string, linkType: LinkType): Observable<QrCodeDTO> {
      return this.http.get<QrCodeDTO>(`${this.url}generateLink/${id}/${linkType}`, { headers: this.headers });
    };
  }
  export enum LinkType{
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