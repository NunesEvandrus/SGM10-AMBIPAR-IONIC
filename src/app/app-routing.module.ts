import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InternoRouteGuard } from './interno/interno.route-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./interno/interno.module').then((m) => m.InternoPageModule),
    canActivate: [InternoRouteGuard]
  },
  {
    path: 'acesso',
    loadChildren: () =>
      import('./acesso/acesso.module').then((m) => m.AcessoPageModule)
  },
  {
    path: 'publico',
    loadChildren: () =>
      import('./publico/publico.module').then((m) => m.PublicoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [InternoRouteGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
