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
    path: 'catalogo',
    loadComponent: () => import('./catalogo/catalogo.component').then((m) => m.CatalogoComponent),
  },
  {
    path: 'detalle-producto/:id',
    loadComponent: () => import('./producto-detalle/producto-detalle.component').then((m) => m.ProductoDetalleComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
