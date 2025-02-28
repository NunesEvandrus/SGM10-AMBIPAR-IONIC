import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { OcorrenciasPageRoutingModule } from './ocorrencias-routing.module';
import { OcorrenciasPage } from './ocorrencias.page';

@NgModule({
  imports: [InternoCommonModule, OcorrenciasPageRoutingModule],
  declarations: [OcorrenciasPage],
})
export class OcorrenciasPageModule {}
