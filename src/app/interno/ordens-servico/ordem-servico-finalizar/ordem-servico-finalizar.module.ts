import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyFormModule } from '@my-core/components/my-form/my-form.module';
import { OrdemServicoFinalizarPage } from './ordem-servico-finalizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyFormModule
  ],
  declarations: [OrdemServicoFinalizarPage]
})
export class OrdemServicoFinalizarPageModule {}
