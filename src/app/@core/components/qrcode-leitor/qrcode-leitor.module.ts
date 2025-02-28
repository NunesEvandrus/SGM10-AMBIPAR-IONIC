import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrcodeLeitorPage } from './qrcode-leitor.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [QrcodeLeitorPage]
})
export class QrcodeLeitorPageModule {}
