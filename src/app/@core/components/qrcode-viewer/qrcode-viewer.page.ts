import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';

@Component({
  selector: 'app-qrcode-viewer',
  templateUrl: './qrcode-viewer.page.html',
  styleUrls: ['./qrcode-viewer.page.scss']
})
export class QrcodeViewerPage {
  qrcode: string;
  titulo: string;
  subtitulo: string;
  logo: string;
  footer: string;

  constructor(private readonly modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }
}
