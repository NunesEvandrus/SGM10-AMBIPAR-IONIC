import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrcodeMaskComponent } from './qrcode-mask.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [QrcodeMaskComponent],
  exports: [QrcodeMaskComponent],
})
export class QrcodeMaskModule {}
