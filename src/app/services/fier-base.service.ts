import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FierBaseService {
  constructor() {  }
  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // debugger
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: environment.firebase.vpaidKey}).then(
          (currentToken)=>{
            if(currentToken){
              console.log("currentToken:")
              console.log(currentToken)
            }
            else{
              console.log("preobleeeem")
            }
          }
        );

      }
    });
  }


  }
