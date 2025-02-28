import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrcodeMaskModule } from '../qrcode-mask/qrcode-mask.module';
import { QrcodeViewerPage } from './qrcode-viewer.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, QrcodeMaskModule],
  declarations: [QrcodeViewerPage],
})
export class QrcodeViewerPageModule {}
