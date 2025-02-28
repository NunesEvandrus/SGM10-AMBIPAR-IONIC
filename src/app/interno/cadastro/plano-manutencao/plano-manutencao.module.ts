import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { PlanoManutencaoPageRoutingModule } from './plano-manutencao-routing.module';
import { PlanoManutencaoPage } from './plano-manutencao.page';

@NgModule({
  imports: [InternoCommonModule, PlanoManutencaoPageRoutingModule],
  declarations: [PlanoManutencaoPage],
})
export class PlanoManutencaoPageModule {}
