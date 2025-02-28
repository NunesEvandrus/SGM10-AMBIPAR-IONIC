import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'base-operacional',
    loadChildren: () =>
      import('./base-operacional/base-operacional.module').then(
        (m) => m.BaseOperacionalPageModule
      )
  },
  {
    path: 'equipamentos',
    loadChildren: () =>
      import('./equipamentos/equipamentos.module').then(
        (m) => m.EquipamentosPageModule
      )
  },
  {
    path: 'tipos-equipamentos',
    loadChildren: () =>
      import('./tipos-equipamentos/tipos-equipamentos.module').then(
        (m) => m.TiposEquipamentosPageModule
      )
  },
  {
    path: 'plano-manutencao',
    loadChildren: () =>
      import('./plano-manutencao/plano-manutencao.module').then(
        (m) => m.PlanoManutencaoPageModule
      )
  },
  {
    path: 'materiais',
    loadChildren: () =>
      import('./materiais/materiais.module').then((m) => m.MateriaisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPageRoutingModule {}
