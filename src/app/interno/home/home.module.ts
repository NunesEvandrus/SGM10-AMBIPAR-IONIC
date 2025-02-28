import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [InternoCommonModule, HomePageRoutingModule],
  declarations: [HomePage]
})
export class HomePageModule {}
