import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdensServicoPage } from './ordens-servico.page';

const routes: Routes = [
  {
    path: 'tipo/:tipoPlano',
    component: OrdensServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensServicoPageRoutingModule {}
