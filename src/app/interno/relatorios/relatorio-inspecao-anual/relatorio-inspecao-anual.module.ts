import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { RelatorioInspecaoAnualPageRoutingModule } from './relatorio-inspecao-anual-routing.module';
import { RelatorioInspecaoAnualPage } from './relatorio-inspecao-anual.page';

@NgModule({
  imports: [InternoCommonModule, RelatorioInspecaoAnualPageRoutingModule],
  declarations: [RelatorioInspecaoAnualPage],
})
export class RelatorioInspecaoAnualPageModule {}
