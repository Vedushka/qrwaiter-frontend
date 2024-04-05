import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboadRoutes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children:[
            {
                path: "profile",
                loadComponent: () => import("./profile/profile.component").then(mod => mod.ProfileComponent)
            },
        ]
    },
];
