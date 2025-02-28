import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdemServicoImpressaConcluidaPage } from './ordem-servico-impressa-concluida.page';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, NgxDocViewerModule, IonicModule],
  declarations: [OrdemServicoImpressaConcluidaPage]
})
export class OrdemServicoImpressaConcluidaPageModule {}
