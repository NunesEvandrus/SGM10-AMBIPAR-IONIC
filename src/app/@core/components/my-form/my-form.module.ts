import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListagemSelecaoPageModule } from '../listagem-selecao/listagem-selecao.module';
import { PhotoCapturePageModule } from '../photo-capture/photo-capture.module';
import { MyFormComponent } from './my-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PhotoCapturePageModule,
    ListagemSelecaoPageModule
  ],
  declarations: [MyFormComponent],
  exports: [MyFormComponent]
})
export class MyFormModule {}
