import { NgModule } from '@angular/core';
import { QrcodeViewerPageModule } from '@my-core/components/qrcode-viewer/qrcode-viewer.module';
import { RegisterViewerPageModule } from '@my-core/components/register-viewer/register-viewer.module';
import { InternoCommonModule } from '../../@partials/modules/interno-common.module';
import { EquipamentosPageRoutingModule } from './equipamentos-routing.module';
import { EquipamentosPage } from './equipamentos.page';
import { EquipamentoCadastroPageModule } from './equipamentos-cadastro/equipamento-cadastro.module';

@NgModule({
  imports: [
    InternoCommonModule,
    EquipamentosPageRoutingModule,
    QrcodeViewerPageModule,
    RegisterViewerPageModule,
    EquipamentoCadastroPageModule
  ],
  declarations: [EquipamentosPage]
})
export class EquipamentosPageModule {}
