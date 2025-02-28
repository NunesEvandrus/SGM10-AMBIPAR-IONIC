import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  LoadingController
} from '@ionic/angular';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { SessionProvider } from '@my-core/providers/session.provider';
import { CUSTOMER_CONFIGS, environment } from 'src/environments/environment';

@Component({
  selector: 'app-ordem-servico-impressa',
  templateUrl: './ordem-servico-impressa.page.html',
  styleUrls: ['./ordem-servico-impressa.page.scss']
})
export class OrdemServicoImpressaPage implements OnInit {
  id: number;
  documentUrl = CUSTOMER_CONFIGS.OSNova;
  baseAtiva: any;

  constructor(
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    public sessionProvider: SessionProvider,
    private readonly loadingCtrl: LoadingController
  ) {}
  async ngOnInit(): Promise<void> {
    this.baseAtiva = this.sessionProvider.getBaseAtiva();
    console.log(this.baseAtiva);
    this.id = this.id;
    this.documentUrl = `${this.documentUrl}${this.id}?baseLogado=${this.baseAtiva.id}`;
    await this.init();
  }
  async init() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (!this.id) {
      this.fechar();
    }

    await loading.dismiss();
  }
  fechar(role: ModalCloseStatus = ModalCloseStatus.CANCEL, data: any = null) {
    this.modalCtrl.dismiss(data, role);
  }
}
