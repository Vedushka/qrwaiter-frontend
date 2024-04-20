import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
    url = environment.apiUrl + "/api/qrCode/";
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