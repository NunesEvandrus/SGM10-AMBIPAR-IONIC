import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { GraficosPageRoutingModule } from './graficos-routing.module';
import { GraficosPage } from './graficos.page';

@NgModule({
  imports: [InternoCommonModule, GraficosPageRoutingModule],
  declarations: [GraficosPage],
})
export class GraficosPageModule {}
