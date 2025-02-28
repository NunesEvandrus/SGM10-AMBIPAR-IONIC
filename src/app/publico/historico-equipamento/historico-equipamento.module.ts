import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataViewerModule } from '@my-core/components/register-viewer/data-viewer/data-viewer.module';
import { InternoCommonModule } from 'src/app/interno/@partials/modules/interno-common.module';
import { OrdemServicoFinalizarPageModule } from 'src/app/interno/ordens-servico/ordem-servico-finalizar/ordem-servico-finalizar.module';
import { HistoricoEquipamentoPageRoutingModule } from './historico-equipamento-routing.module';
import { HistoricoEquipamentoPage } from './historico-equipamento.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricoEquipamentoPageRoutingModule,
    InternoCommonModule,
    OrdemServicoFinalizarPageModule,
    DataViewerModule
  ],
  declarations: [HistoricoEquipamentoPage]
})
export class HistoricoEquipamentoPageModule {}
