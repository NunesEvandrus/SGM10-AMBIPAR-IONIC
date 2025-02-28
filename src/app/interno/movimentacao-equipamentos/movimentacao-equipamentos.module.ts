import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { MovimentacaoEquipamentosPageRoutingModule } from './movimentacao-equipamentos-routing.module';
import { MovimentacaoEquipamentosPage } from './movimentacao-equipamentos.page';

@NgModule({
  imports: [InternoCommonModule, MovimentacaoEquipamentosPageRoutingModule],
  declarations: [MovimentacaoEquipamentosPage]
})
export class MovimentacaoEquipamentosPageModule {}
