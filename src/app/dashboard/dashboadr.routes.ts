import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboadRoutes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children:[
            {
                path: "",
                loadComponent: () => import("./dashboard-content/dashboard-content.component").then(mod => mod.DashboardContentComponent)
            },
            {
                path: "profile",
                loadComponent: () => import("./profile/profile.component").then(mod => mod.ProfileComponent)
            },
            {
                path: "tables",
                loadComponent: () => import("./tables/tables.component").then(mod => mod.TablesComponent)
            },
          {
            path: "qr-print",
            loadComponent: () => import("./qr-print/qr-print.component").then(mod => mod.QrPrintComponent),
          },
        ]
    },
];
