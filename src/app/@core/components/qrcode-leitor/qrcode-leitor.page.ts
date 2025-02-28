import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
// import { CameraDevice } from 'html5-qrcode/esm/core';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import { AlertDefault, AlertOurError } from '../../utils/alert.utils';

@Component({
  selector: 'app-qrcode-leitor',
  templateUrl: './qrcode-leitor.page.html',
  styleUrls: ['./qrcode-leitor.page.scss']
})
export class QrcodeLeitorPage implements OnInit, OnDestroy {
  activeCamera: {
    id: string;
    label: string;
  };
  html5QrCode: Html5Qrcode;
  indiceAtivo = 0;
  podeAlterarCamera = false;

  loading = true;
  cameras: CameraDevice[];

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroiQrcodeReader();
  }

  async init() {
    try {
      const cameras = await this.getCameras();

      if (!cameras || !cameras.length) {
        return AlertDefault(
          this.alertCtrl,
          'Nenhuma câmera acessível',
          'Por favor, verifique se autorizou que o site utilize a câmera e tente novamente.'
        );
      }

      this.activeCamera = cameras[this.indiceAtivo];
      this.podeAlterarCamera = cameras.length > 1;

      await this.criaQrcodeReader();

      this.loading = false;
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Erro ao criar o leitor de QR Code',
        err
      );
      this.fechar();
    }
  }

  private async getCameras() {
    let cameras: CameraDevice[] = [];

    if (this.cameras !== undefined) {
      cameras = this.cameras;
    } else {
      cameras = await Html5Qrcode.getCameras();
      this.cameras = cameras;
    }

    return cameras;
  }

  private async destroiQrcodeReader() {
    if (this.html5QrCode) {
      await this.html5QrCode.stop();
      this.html5QrCode.clear();
    }
  }

  private async criaQrcodeReader() {
    const onScanSuccess = (decodedText: string) => {
      this.modalCtrl.dismiss(decodedText, ModalCloseStatus.CONFIRM);
    };

    const onScanFailure = (error) => {};

    await this.destroiQrcodeReader();

    this.html5QrCode = new Html5Qrcode('qrcode-reader');

    await this.html5QrCode.start(
      this.activeCamera.id,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      onScanSuccess,
      onScanFailure
    );
  }

  async alterarCamera() {
    const cameras = await this.getCameras();

    this.indiceAtivo =
      this.indiceAtivo + 1 === cameras.length ? 0 : this.indiceAtivo + 1;

    this.activeCamera = cameras[this.indiceAtivo];

    await this.criaQrcodeReader();
  }

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }
}
