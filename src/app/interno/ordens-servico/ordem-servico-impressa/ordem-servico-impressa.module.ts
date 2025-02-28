import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdemServicoImpressaPage } from './ordem-servico-impressa.page';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, NgxDocViewerModule, IonicModule],
  declarations: [OrdemServicoImpressaPage]
})
export class OrdemServicoImpressaPageModule {}
