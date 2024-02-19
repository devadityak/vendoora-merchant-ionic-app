import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginPage } from './login/login.page';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginPage,
    // loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'login',
    component: LoginPage,
    pathMatch: 'full',
    // loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    component: LoginPage,
    // loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
];
