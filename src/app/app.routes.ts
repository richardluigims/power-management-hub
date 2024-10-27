import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import("./pages/login/login.component").then(c => c.LoginComponent)
    },
    {
        path: '',
        redirectTo: '/login',
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
];
