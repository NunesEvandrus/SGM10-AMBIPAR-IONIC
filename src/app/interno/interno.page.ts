import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController
} from '@ionic/angular';
import { IListagemItem } from '@my-core/components/listagem-selecao/listagem-selecao.interfaces';
import { AbreListagemSelecaoUnica } from '@my-core/components/listagem-selecao/listagem-selecao.utils';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { APP_VERSION, CUSTOMER_CONFIGS } from 'src/environments/environment';
import { IMenuItem } from '../@core/interfaces/menu.interface';
import { SessionProvider } from '../@core/providers/session.provider';
// import { PERFIL_ACESSO_MAP } from './controle-acesso/controle-acesso.interfaces';
import { QrcodeLeitorPage } from '@my-core/components/qrcode-leitor/qrcode-leitor.page';
import {
  BarcodeScannerProvider,
  IScanResult
} from '@my-core/providers/barcode-scanner.provider';
import { AlertDefault } from '@my-core/utils/alert.utils';
import { ModalPresentUtil } from '@my-core/utils/modal.utils';
import { InternoSplitPanelController } from './interno-split-panel.controller';
import { MENU } from './interno.constants';

@Component({
  selector: 'app-interno',
  templateUrl: './interno.page.html',
  styleUrls: ['./interno.page.scss']
})
export class InternoPage implements OnInit {
  menu: any = MENU;
  logoMenu = CUSTOMER_CONFIGS.LogoMenu;
  // perfilMap = PERFIL_ACESSO_MAP;

  appVersion = APP_VERSION;

  constructor(
    public readonly sessionProvider: SessionProvider,
    public splitPanelCtrl: InternoSplitPanelController,
    public modalCtrl: ModalController,
    public barcodeScannerProvider: BarcodeScannerProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  isMenuPermitido(menu: IMenuItem) {
    const funcionalidade = this.sessionProvider.permissoes[menu.Funcionalidade];
    return (
      !menu.Funcionalidade || (funcionalidade && funcionalidade[menu.Permissao])
    );
  }

  ngOnInit() {}

  async trocarBaseAcesso() {
    const options: IListagemItem[] =
      this.sessionProvider.session.basesAcesso.map((baseAcesso) => ({
        Key: baseAcesso.id,
        Label: baseAcesso.nome
      }));

    const retornoSelecao = await AbreListagemSelecaoUnica(
      this.modalCtrl,
      'Selecionar base de acesso',
      options,
      this.sessionProvider.baseAtiva.id
    );

    if (
      retornoSelecao.status === ModalCloseStatus.CONFIRM &&
      retornoSelecao?.selecao
    ) {
      const baseAtiva = this.sessionProvider.session.basesAcesso.find(
        (base) => retornoSelecao.selecao === base.id
      );

      await this.sessionProvider.setBaseAtiva(baseAtiva);

      location.reload();
    }
  }

  async lerQrcode() {
    let result: IScanResult;
    if (this.barcodeScannerProvider.pluginAvailable()) {
      result = await this.barcodeScannerProvider.scanQrcode();
    } else {
      result = (await ModalPresentUtil<string>(
        this.modalCtrl,
        QrcodeLeitorPage
      )) as IScanResult;
    }

    if (result.role === ModalCloseStatus.CONFIRM) {
      const qrcode = result.data || '';
      if (qrcode.startsWith(CUSTOMER_CONFIGS.QRCode.Link)) {
        const linkInterno = qrcode.replace(CUSTOMER_CONFIGS.QRCode.Link, '');
        this.navCtrl.navigateForward(linkInterno);
      } else if (qrcode.startsWith('http')) {
        window.open(qrcode, '_blank');
      } else {
        AlertDefault(
          this.alertCtrl,
          'QR Code inválido.',
          'Este QR Code não é reconhecido pelo sistema. Verifique se este QR Code foi gerado corretamente.'
        );
      }
    }
  }

  logout() {
    this.sessionProvider.logout();
  }
}
