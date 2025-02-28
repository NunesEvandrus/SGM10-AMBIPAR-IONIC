import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImagemComponent } from './imagem.component';

@NgModule({
  declarations: [ImagemComponent],
  imports: [CommonModule, IonicModule],
  exports: [ImagemComponent]
})
export class ImagemModule {}
