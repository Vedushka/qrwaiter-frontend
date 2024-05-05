import { Routes } from '@angular/router';
import { QrComponent } from './qr.component';

export const qrRoutes: Routes = [
    {
        path: "",
        component: QrComponent,
        children:[
            {
                path: "subscribe/:id",
                loadComponent: () => import("./subscribe/subscribe.component").then(mod => mod.SubscribeComponent)
            },
            {
                path: "call/:id",
                loadComponent: () => import("./call/call.component").then(mod => mod.CallComponent)
            },
          {
            path: "waiter/:restaurantLink",
            loadComponent: () => import("./waiter-page/waiter-page.component").then(mod => mod.WaiterPageComponent)
          },
        ]
    },
];
