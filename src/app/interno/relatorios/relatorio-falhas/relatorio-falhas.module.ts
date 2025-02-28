import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { RelatorioFalhasPageRoutingModule } from './relatorio-falhas-routing.module';
import { RelatorioFalhasPage } from './relatorio-falhas.page';

@NgModule({
  imports: [InternoCommonModule, RelatorioFalhasPageRoutingModule],
  declarations: [RelatorioFalhasPage],
})
export class RelatorioFalhasPageModule {}
