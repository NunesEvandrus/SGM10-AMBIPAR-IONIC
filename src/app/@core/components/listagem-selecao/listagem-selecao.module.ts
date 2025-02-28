import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ListagemSelecaoPage } from './listagem-selecao.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PipesModule],
  declarations: [ListagemSelecaoPage]
})
export class ListagemSelecaoPageModule {}
