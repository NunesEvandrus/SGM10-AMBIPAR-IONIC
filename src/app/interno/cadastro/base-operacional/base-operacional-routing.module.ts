import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseOperacionalPage } from './base-operacional.page';

const routes: Routes = [
  {
    path: '',
    component: BaseOperacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseOperacionalPageRoutingModule {}
