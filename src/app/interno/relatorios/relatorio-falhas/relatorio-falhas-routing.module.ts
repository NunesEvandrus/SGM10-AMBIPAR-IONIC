import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioFalhasPage } from './relatorio-falhas.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioFalhasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioFalhasPageRoutingModule {}
