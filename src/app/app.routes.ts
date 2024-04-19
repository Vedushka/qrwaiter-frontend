import { Routes } from '@angular/router';
import { canActivateDashboard, canActivateIdentity, canActivateMainPage } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "identity/login",
        pathMatch : "full"
    },
    {
        path: "identity",
        loadChildren: () => import("./identity/identity.routes").then(r => r.identityRoutes),
        canActivate: [canActivateIdentity]
    },
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboadr.routes").then(r => r.dashboadRoutes),
        canActivate: [canActivateDashboard],
    },
    {
        path: "qr",
        loadChildren: () => import("./qr/qr.routes").then(r => r.qrRoutes),
    }
];
