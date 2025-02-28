import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { AlertOurError } from '@my-core/utils/alert.utils';
import { OurError } from '@my-core/utils/our-error.utils';

export interface IScanResult {
  data?: string;
  role: ModalCloseStatus;
}

@Injectable({ providedIn: 'root' })
export class BarcodeScannerProvider {
  constructor(
    private readonly barcodeScanner: BarcodeScanner,
    private readonly alertCtrl: AlertController
  ) {}

  pluginAvailable() {
    return Capacitor.isNativePlatform();
  }

  async scanQrcode() {
    try {
      const barcodeData = await this.barcodeScanner.scan({
        formats: 'QR_CODE',
        prompt: 'Posicione o QR Code no centro da tela.',
        resultDisplayDuration: 0
      });

      return {
        data: barcodeData.text ? barcodeData.text : null,
        role: barcodeData.text
          ? ModalCloseStatus.CONFIRM
          : ModalCloseStatus.CANCEL
      };
    } catch (err) {
      if (typeof err === 'string') {
        const permissionDenied = `Access to the camera has been prohibited; please enable it in the Settings app to continue.`;
        const illegalAccess = 'Illegal access';

        if (err === permissionDenied || err === illegalAccess) {
          const msgAmigavel = `Não foi possível utilizar a câmera. Por favor, permita o uso da câmera nas configurações do aparelho.`;

          err = new OurError(msgAmigavel, err);
        } else {
          err = new Error(err);
        }
      }

      console.error(err);
      AlertOurError(this.alertCtrl, 'Falha na leitura do QR Code', err);

      throw err;
    }
  }
}
