importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging.js');

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'bfwOXoD_fB0Kda73BzMwXzuoC26Zcjj5lxs2JrnvH3Y' }).then((currentToken) => {
  console.dir(currentToken)
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
