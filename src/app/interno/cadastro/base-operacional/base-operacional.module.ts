import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { BaseOperacionalPageRoutingModule } from './base-operacional-routing.module';
import { BaseOperacionalPage } from './base-operacional.page';

@NgModule({
  imports: [InternoCommonModule, BaseOperacionalPageRoutingModule],
  declarations: [BaseOperacionalPage],
})
export class BaseOperacionalPageModule {}
