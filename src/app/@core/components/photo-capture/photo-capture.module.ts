import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagemModule } from '../imagem/listagem.module';
import { PhotoCapturePage } from './photo-capture.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ImagemModule],
  declarations: [PhotoCapturePage]
})
export class PhotoCapturePageModule {}
