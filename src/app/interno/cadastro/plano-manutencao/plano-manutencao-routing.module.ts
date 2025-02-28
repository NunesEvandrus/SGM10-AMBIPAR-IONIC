import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanoManutencaoPage } from './plano-manutencao.page';

const routes: Routes = [
  {
    path: '',
    component: PlanoManutencaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoManutencaoPageRoutingModule {}
