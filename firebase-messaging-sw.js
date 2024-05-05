importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging.js');

const app = initializeApp({
  apiKey: "AIzaSyBzzwLr1eVLzctDMyfjXtgZCZ5lWG3Cb8w",
  authDomain: "qr-waiter-123.firebaseapp.com",
  projectId: "qr-waiter-123",
  storageBucket: "qr-waiter-123.appspot.com",
  messagingSenderId: "851267426934",
  appId: "1:851267426934:web:39122247bbf60ca89b1d57",
  measurementId: "G-NFWL27E7KT",
});

isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
      self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });

  }

});
