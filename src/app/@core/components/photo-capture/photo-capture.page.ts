import { Component, OnInit } from '@angular/core';
import { CameraSource } from '@capacitor/camera';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import { CameraProvider } from '../../providers/camera.provider';
import { AlertConfirm } from '../../utils/alert.utils';

export interface IPhotoCaptureReturn {
  foto: string;
  legenda: string;
}

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.page.html',
  styleUrls: ['./photo-capture.page.scss']
})
export class PhotoCapturePage implements OnInit {
  loading = true;
  foto: string = null;
  legenda: string = null;
  legendaHabilitada = false;
  cameraSource: CameraSource;
  somenteConsulta = false;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly cameraProvider: CameraProvider
  ) {}

  ngOnInit() {
    if (!this.foto && !this.somenteConsulta) {
      this.obterFoto();
    }
  }

  async obterFoto() {
    const foto = await this.cameraProvider.getPhoto(this.cameraSource);
    this.foto = foto;
  }

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }

  async removerFoto() {
    const desejaMesmoRemover = await AlertConfirm(
      this.alertCtrl,
      'Tem certeza?',
      'Remover irá remover a foto obtida' +
        (this.legendaHabilitada ? ' e limpar a legenda' : '')
    );

    if (desejaMesmoRemover) {
      this.foto = null;
      this.legenda = null;
    }
  }

  confirmar() {
    this.modalCtrl.dismiss(
      { foto: this.foto, legenda: this.legenda } as IPhotoCaptureReturn,
      ModalCloseStatus.CONFIRM
    );
  }
}
