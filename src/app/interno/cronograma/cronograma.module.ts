import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { CronogramaPageRoutingModule } from './cronograma-routing.module';
import { CronogramaPage } from './cronograma.page';

@NgModule({
  imports: [InternoCommonModule, CronogramaPageRoutingModule],
  declarations: [CronogramaPage],
})
export class CronogramaPageModule {}
