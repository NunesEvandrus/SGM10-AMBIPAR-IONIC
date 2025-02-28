import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ListagemSelecaoPageModule } from '@my-core/components/listagem-selecao/listagem-selecao.module';
import { PublicoPageRoutingModule } from './publico-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PublicoPageRoutingModule,
    ListagemSelecaoPageModule,
  ],
})
export class PublicoPageModule {}
