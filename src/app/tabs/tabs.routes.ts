import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'relatorio',
        loadComponent: () =>
          import('../relatorio/relatorio.page').then((m) => m.RelatorioPage),
      },
      {
        path: 'lista',
        loadComponent: () =>
          import('../lista/lista.page').then((m) => m.ListaPage),
      },
      {
        path: '',
        redirectTo: '/lista',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/lista',
    pathMatch: 'full',
  },
];
