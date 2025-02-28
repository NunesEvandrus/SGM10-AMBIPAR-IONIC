import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { MateriaisPageRoutingModule } from './materiais-routing.module';
import { MateriaisPage } from './materiais.page';

@NgModule({
  imports: [InternoCommonModule, MateriaisPageRoutingModule],
  declarations: [MateriaisPage]
})
export class MateriaisPageModule {}
