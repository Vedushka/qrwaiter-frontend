import { Routes } from '@angular/router';
import { IdentityComponent } from './identity.component';

export const identityRoutes: Routes = [
    {
        path: "",
        component: IdentityComponent,
        children:[
            {
                path: "login",
                loadComponent: () => import("./login/login.component").then(mod => mod.LoginComponent)
            },
            {
                path: "registration",
                loadComponent: () => import("./registration/registration.component").then(mod => mod.RegistrationComponent)
            },
        ]
    },
];
