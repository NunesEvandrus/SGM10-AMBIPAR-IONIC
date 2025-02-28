import { NgModule } from '@angular/core';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { EditarDataModalModule } from './editar-data-modal/editar-data.module';
import { OrdemServicoCadastroPageModule } from './ordem-servico-cadastro/ordem-servico-cadastro.module';
import { OrdemServicoFinalizarPageModule } from './ordem-servico-finalizar/ordem-servico-finalizar.module';
import { OrdensServicoPageRoutingModule } from './ordens-servico-routing.module';
import { OrdensServicoPage } from './ordens-servico.page';
import { OrdemServicoImpressaPageModule } from './ordem-servico-impressa/ordem-servico-impressa.module';
import { OrdemServicoImpressaConcluidaPageModule } from './ordem-servico-impressa-concluida/ordem-servico-impressa-concluida.module';

@NgModule({
  imports: [
    InternoCommonModule,
    OrdensServicoPageRoutingModule,
    EditarDataModalModule,
    OrdemServicoCadastroPageModule,
    OrdemServicoFinalizarPageModule,
    OrdemServicoImpressaPageModule,
    OrdemServicoImpressaConcluidaPageModule
  ],
  declarations: [OrdensServicoPage]
})
export class OrdensServicoPageModule {}
