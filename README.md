# QrwaiterFrontend

Web service for restaurants.

Call the waiter by qr-code

Register as restaurant, create tables, print qr-codes for tables, subscribe to tables as waiter by phone, and receive notification when client scans qr-code on table.

## Development server

> [!IMPORTANT]  
> App requirs https for using Google Firebase Mesaging.

> [!IMPORTANT]
> You have to provide your own credential for Google Firebase Messaging service at src\firebase-messaging-sw.js

Run `npm run start-local` or `ng serve --ssl --ssl-key localhost-key.pem --ssl-cert localhost.pem` for a dev server. Navigate to `https://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Linked project

[qrwaiter-backend](https://github.com/Vedushka/qrwaiter-backend)
