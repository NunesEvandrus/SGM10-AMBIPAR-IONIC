import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import { IRegisterField } from './register-viewer.types';

@Component({
  selector: 'app-register-viewer',
  templateUrl: './register-viewer.page.html',
  styleUrls: ['./register-viewer.page.scss']
})
export class RegisterViewerPage {
  fields: IRegisterField[];
  data: any;
  title: string;

  constructor(private readonly modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }
}
