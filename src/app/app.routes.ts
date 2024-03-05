import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import("./identity/login/login.component").then(mod => mod.LoginComponent)
    },
    {
        path: "registration",
        loadComponent: () => import("./identity/registration/registration.component").then(mod => mod.RegistrationComponent)
    },
];
