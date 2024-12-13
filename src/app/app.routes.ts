import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'pasos',
    loadComponent: () => import('./pasos/pasos.component').then((m) => m.PasosComponent),
  },
  {
    path: 'sobreNosotros',
    loadComponent: () => import('./sobre-nosotros/sobre-nosotros.component').then((m) => m.SobreNosotrosComponent),
  },
  {
    path: 'preguntas',
    loadComponent: () => import('./preguntas/preguntas.component').then((m) => m.PreguntasComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
