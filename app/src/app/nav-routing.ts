import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';

export interface NavRoute extends Route {
    path?: string;
    icon?: string;
    group?: string;
    groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = 'app';

export const navRoutes: NavRoute[] = [
  {
    data: { title: `Profesionales de la Salud` },
    icon: 'home',
    path: 'inicio/:token',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        m => m.HomePageModule,
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'calendario/:thirdpartyId',
    loadChildren: () =>
      import('./pages/calendar/calendar.module').then(
        m => m.CalendarModule
      )
  },
  {
    path: '',
    redirectTo: 'inicio/:token',
    pathMatch: 'full',
  },
];


