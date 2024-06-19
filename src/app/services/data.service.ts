import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSubject: Subject<{[key: string]: any}> = new Subject<{[p: string]: any}>();
  constructor() { }

  changeOrAddData(arr: {[key: string]: any}){
      this.dataSubject.next(arr);
  }
}

