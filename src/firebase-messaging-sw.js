importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')
const config = {
  apiKey: "AIzaSyBzzwLr1eVLzctDMyfjXtgZCZ5lWG3Cb8w",
  authDomain: "qr-waiter-123.firebaseapp.com",
  projectId: "qr-waiter-123",
  storageBucket: "qr-waiter-123.appspot.com",
  messagingSenderId: "851267426934",
  appId: "1:851267426934:web:39122247bbf60ca89b1d57",
  measurementId: "G-NFWL27E7KT",
};
firebase.initializeApp(config);
firebase.messaging();
