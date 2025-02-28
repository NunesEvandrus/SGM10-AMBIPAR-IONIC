import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticoFalhasPage } from './diagnostico-falhas.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticoFalhasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticoFalhasPageRoutingModule {}
