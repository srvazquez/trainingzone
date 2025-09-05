import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Training Zone'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('./features/plans/plans.module').then(m => m.PlansModule)
      },
      {
        path: 'small-groups',
        loadChildren: () => import('./features/small-groups/small-groups.module').then(m => m.SmallGroupsModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('./features/calculator/calculator.module').then(m => m.CalculatorModule)
      },
      {
        path: 'aviso-legal',
        loadChildren: () =>
          import('./features/avisolegal/avisolegal.routes').then(m => m.AVISOLEGAL_ROUTES),
      },
      {
        path: 'politica-privacidad',
        loadChildren: () =>
          import('./features/politica-privacidad/politica-privacidad.routes').then(m => m.POLITICA_PRIVACIDAD_ROUTES),
      },
      {
        path: 'politica-cookies',
        loadChildren: () =>
          import('./features/politica-cookies/politica-cookies.routes').then(m => m.POLITICA_COOKIES_ROUTES),
      },
      {
        path: 'terminos-condiciones',
        loadChildren: () =>
          import('./features/terminos-condiciones/terminos-condiciones.routes').then(m => m.TERMINOS_CONDICIONES_ROUTES),
      },

    ]
  },
  /*  { path: '**', component: Error404Component } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
