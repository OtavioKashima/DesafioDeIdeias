import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Rota principal: quando o app abre, ele joga o usuário para a lista
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  
  // 2. Rota da Lista de Relatórios
  {
    path: 'lista',
    // Atenção: verifique se o caminho './lista/lista.page' 
    // bate exatamente com o nome da pasta e do arquivo que você criou
    loadComponent: () => import('./lista/lista.page').then( m => m.ListaPage)
  },
  
  // 3. Rota para CRIAR um novo relatório (vazio)
  {
    path: 'relatorio',
    loadComponent: () => import('./relatorio/relatorio.page').then( m => m.RelatorioPage)
  },
  
  // 4. Rota para EDITAR um relatório (recebe o ID na URL)
  {
    path: 'relatorio/:id',
    loadComponent: () => import('./relatorio/relatorio.page').then( m => m.RelatorioPage)
  }
];