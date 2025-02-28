import { NgModule } from '@angular/core';
import { CoreComponentsModule } from '@my-core/components/core-components.module';
import { ListagemSelecaoPageModule } from '@my-core/components/listagem-selecao/listagem-selecao.module';
import { InternoCommonModule } from './@partials/modules/interno-common.module';
import { InternoPageRoutingModule } from './interno-routing.module';
import { InternoPage } from './interno.page';

@NgModule({
  imports: [
    InternoCommonModule,
    InternoPageRoutingModule,
    ListagemSelecaoPageModule,
    CoreComponentsModule
  ],
  declarations: [InternoPage]
})
export class InternoPageModule {}
