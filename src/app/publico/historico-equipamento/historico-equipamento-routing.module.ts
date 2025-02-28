import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoEquipamentoPage } from './historico-equipamento.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoEquipamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoEquipamentoPageRoutingModule {}
