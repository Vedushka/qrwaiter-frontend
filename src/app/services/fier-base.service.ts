import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";


@Injectable({
  providedIn: 'root'
})
export class FierBaseService {
  
  constructor() { }
  firebaseConfig : any = {
    apiKey: "AIzaSyBzzwLr1eVLzctDMyfjXtgZCZ5lWG3Cb8w",
    authDomain: "qr-waiter-123.firebaseapp.com",
    projectId: "qr-waiter-123",
    storageBucket: "qr-waiter-123.appspot.com",
    messagingSenderId: "851267426934",
    appId: "1:851267426934:web:39122247bbf60ca89b1d57",
    measurementId: "G-NFWL27E7KT"
  };
  app = initializeApp(this.firebaseConfig);
  messaging = getMessaging(this.app);
  
}
