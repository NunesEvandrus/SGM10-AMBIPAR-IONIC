import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { DiagnosticoFalhasPageRoutingModule } from './diagnostico-falhas-routing.module';
import { DiagnosticoFalhasPage } from './diagnostico-falhas.page';

@NgModule({
  imports: [InternoCommonModule, DiagnosticoFalhasPageRoutingModule],
  declarations: [DiagnosticoFalhasPage],
})
export class DiagnosticoFalhasPageModule {}
