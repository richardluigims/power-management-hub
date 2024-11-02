import { Routes } from '@angular/router';
import { childRouteGuard, routeGuard } from './RouteGuard/route-guard.guard';

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
                loadComponent: () => import("./pages/aparelhos/aparelhos.component").then(c => c.AparelhosComponent)
            },
            {
                path: 'usuarios',
                loadComponent: () => import("./pages/usuarios/usuarios.component").then(c => c.UsuariosComponent)
            }
        ]
    }
];
