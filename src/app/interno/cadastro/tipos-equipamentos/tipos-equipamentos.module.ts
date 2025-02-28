import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { TiposEquipamentosPageRoutingModule } from './tipos-equipamentos-routing.module';
import { TiposEquipamentosPage } from './tipos-equipamentos.page';

@NgModule({
  imports: [InternoCommonModule, TiposEquipamentosPageRoutingModule],
  declarations: [TiposEquipamentosPage],
})
export class TiposEquipamentosPageModule {}
