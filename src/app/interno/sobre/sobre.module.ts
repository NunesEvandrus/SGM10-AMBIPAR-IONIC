import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { SobrePageRoutingModule } from './sobre-routing.module';
import { SobrePage } from './sobre.page';

@NgModule({
  imports: [InternoCommonModule, SobrePageRoutingModule],
  declarations: [SobrePage]
})
export class SobrePageModule {}
