import { Routes } from '@angular/router';
import { childRouteGuard, routeGuard } from './route-guard/route-guard.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import("./pages/login/login.component").then(c => c.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import("./pages/navigation/navigation.component").then(c => c.NavigationComponent),
        canActivate: [routeGuard],
        canActivateChild: [childRouteGuard],
        children: [
            {
                path: '',
                redirectTo: 'aparelhos',
                pathMatch: 'full'
            },
            {
                path: 'aparelhos',
                loadComponent: () => import("./pages/devices/devices.component").then(c => c.DevicesComponent)
            },
            {
                path: 'usuarios',
                loadComponent: () => import("./pages/usuarios/usuarios.component").then(c => c.UsuariosComponent)
            }
        ]
    }
];
