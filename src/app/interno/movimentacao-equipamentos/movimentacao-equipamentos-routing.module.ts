import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimentacaoEquipamentosPage } from './movimentacao-equipamentos.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentacaoEquipamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoEquipamentosPageRoutingModule {}
