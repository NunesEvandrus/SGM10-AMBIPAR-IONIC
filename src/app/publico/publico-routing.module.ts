import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'historico-equipamento/:equipamentoId',
    loadChildren: () =>
      import('./historico-equipamento/historico-equipamento.module').then(
        (m) => m.HistoricoEquipamentoPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicoPageRoutingModule {}
