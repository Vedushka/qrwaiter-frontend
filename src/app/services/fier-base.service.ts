import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
<<<<<<< Updated upstream
import { getMessaging } from "firebase/messaging";
=======
import { getMessaging, getToken } from "firebase/messaging";
import { environment } from "../../environments/environment";
>>>>>>> Stashed changes


@Injectable({
  providedIn: 'root'
})
export class FierBaseService {
<<<<<<< Updated upstream
  
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
=======

  constructor() {
  }
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
>>>>>>> Stashed changes
