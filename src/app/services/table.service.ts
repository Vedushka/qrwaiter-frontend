import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  url = environment.apiUrl + "/api/table/";
  constructor(
    private http: HttpClient,
  ) { }
  updateTable(body: TableDTO): Observable<TableDTO> {
    return this.http.post<TableDTO>(this.url, body);
  };
  deleteTable(id: string): Observable<TableDTO> {
    return this.http.delete<TableDTO>(this.url + id);
  };
  addTable(body: AddTableDTO): Observable<TableDTO> {
    return this.http.put<TableDTO>(this.url, body);
  };
  getTable(): Observable<TableDTO> {
    return this.http.get<TableDTO>(this.url);
  };
  getTablesByRestaurantId(id: string): Observable<Array<TableDTO>> {
    return this.http.get<Array<TableDTO>>(`${this.url}restaurant/${id}`);
  };
}


export interface AddTableDTO {
  idResaurant: string;
  name: string;
  number: number;
}
export interface TableDTO {
  id: string;
  idResaurant: string;
  idQrCode: string;
  name: string;
  number: number;
  isDeleted: boolean;
}