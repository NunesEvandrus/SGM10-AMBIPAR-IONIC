import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioInspecaoAnualPage } from './relatorio-inspecao-anual.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioInspecaoAnualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioInspecaoAnualPageRoutingModule {}
