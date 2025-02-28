import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternoPage } from './interno.page';

const routes: Routes = [
  {
    path: '',
    component: InternoPage,
    children: [
      {
        path: 'cadastro',
        loadChildren: () =>
          import('./cadastro/cadastro.module').then((m) => m.CadastroPageModule)
      },
      {
        path: 'ordens-servico',
        loadChildren: () =>
          import('./ordens-servico/ordens-servico.module').then(
            (m) => m.OrdensServicoPageModule
          )
      },
      {
        path: 'diagnostico-falhas',
        loadChildren: () =>
          import('./diagnostico-falhas/diagnostico-falhas.module').then(
            (m) => m.DiagnosticoFalhasPageModule
          )
      },
      {
        path: 'ocorrencias',
        loadChildren: () =>
          import('./ocorrencias/ocorrencias.module').then(
            (m) => m.OcorrenciasPageModule
          )
      },
      {
        path: 'movimentacao-equipamentos',
        loadChildren: () =>
          import(
            './movimentacao-equipamentos/movimentacao-equipamentos.module'
          ).then((m) => m.MovimentacaoEquipamentosPageModule)
      },
      {
        path: 'graficos',
        loadChildren: () =>
          import('./graficos/graficos.module').then((m) => m.GraficosPageModule)
      },
      {
        path: 'relatorio-falhas',
        loadChildren: () =>
          import('./relatorios/relatorio-falhas/relatorio-falhas.module').then(
            (m) => m.RelatorioFalhasPageModule
          )
      },
      {
        path: 'relatorio-inspecao-anual',
        loadChildren: () =>
          import(
            './relatorios/relatorio-inspecao-anual/relatorio-inspecao-anual.module'
          ).then((m) => m.RelatorioInspecaoAnualPageModule)
      },
      {
        path: 'cronograma',
        loadChildren: () =>
          import('./cronograma/cronograma.module').then(
            (m) => m.CronogramaPageModule
          )
      },
      {
        path: 'controle-acesso',
        loadChildren: () =>
          import('./controle-acesso/controle-acesso.module').then(
            (m) => m.ControleAcessoPageModule
          )
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule)
      },
      {
        path: 'sobre',
        loadChildren: () =>
          import('./sobre/sobre.module').then((m) => m.SobrePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternoPageRoutingModule {}
