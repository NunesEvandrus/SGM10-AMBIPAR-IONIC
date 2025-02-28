import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { BaseListPage } from '@my-core/abstracts-pages/list.base-page';
import { IFilter, IPaginator, ISorting } from '@my-core/components/grid';
import { sortFilterAndPaginateItems } from '@my-core/components/grid/grid.utils';
import { IControl } from '@my-core/components/my-form/my-form.types';
import {
  GeraCampoSimples,
  GeraSelectSimples
} from '@my-core/components/my-form/my-form.utils';
import { QrcodeViewerPage } from '@my-core/components/qrcode-viewer/qrcode-viewer.page';
import { RegisterViewerPage } from '@my-core/components/register-viewer/register-viewer.page';
import { SessionProvider } from '@my-core/providers/session.provider';
import { ModalPresentUtil } from '@my-core/utils/modal.utils';
import { CUSTOMER_CONFIGS } from 'src/environments/environment';
import { EquipamentosApi } from './equipamentos.api';
import { EQUIPAMENTOS_VIEWER_FIELDS } from './equipamentos.constants';
import {
  IEquipamento,
  STATUS_EQUIPAMENTO_OPTIONS
} from './equipamentos.interfaces';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { EquipamentoCadastroPage } from './equipamentos-cadastro/equipamento-cadastro.page';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.page.html',
  styleUrls: ['./equipamentos.page.scss']
})
export class EquipamentosPage
  extends BaseListPage<IEquipamento>
  implements OnInit
{
  @ViewChild('qrcodeCell', { static: true }) qrcodeCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  filterControls: IControl[] = [
    GeraCampoSimples('id', 'ID'),
    GeraCampoSimples('tipoEquipamento', 'Tipo de Equipamento'),
    GeraCampoSimples('tag', 'Tag'),
    GeraSelectSimples(
      'statusEquEnum.Exact',
      'Status',
      STATUS_EQUIPAMENTO_OPTIONS
    )
  ];

  filterMaps = {};

  isNativePlatform: boolean;

  constructor(
    protected modalCtrl: ModalController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public sessionProvider: SessionProvider,
    private equipamentosApi: EquipamentosApi
  ) {
    super(modalCtrl, activatedRoute, router);
    this.title = 'Equipamentos';
  }

  async ngOnInit() {
    this.isNativePlatform = Capacitor.isNativePlatform();
    this.columns = [
      {
        Label: 'ID',
        Key: 'id'
      },
      {
        Label: 'TAG',
        Key: 'tag'
      },
      {
        Label: 'Tipo de Equipamento',
        Key: 'tipoEquipamento',
        CssClass: 'ws-nowrap-left'
      },
      {
        Label: 'Status',
        Key: 'statusEquEnum',
        Template: this.statusCell
      },
      {
        Label: 'Manutenções',
        CssClass: 'ws-nowrap',
        Key: 'id',
        NoSort: true,
        Template: this.qrcodeCell
      },
      {
        Label: 'Ações',
        CssClass: 'ws-nowrap',
        Key: 'id',
        NoSort: true,
        Template: this.actionsCell
      }
    ];
    const baseAtiva = await this.sessionProvider.getBaseAtiva();
    this.title += ' - ' + baseAtiva.nome;

    this.init();
  }

  async getItems(
    paginator: IPaginator,
    sorting: ISorting<IEquipamento>,
    filter: IFilter
  ) {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();

    const registros = await this.equipamentosApi.listaTodos(baseAtiva.id);

    return sortFilterAndPaginateItems(
      registros,
      { ...paginator, ...sorting },
      filter
    );
  }

  generateLinkEquipamento(equipamento: IEquipamento) {
    return CUSTOMER_CONFIGS.EquipamentosManutencaoLink(equipamento.id);
  }

  async exibirQRCode(equipamento: IEquipamento) {
    const baseAtiva = this.sessionProvider.baseAtiva;
    const link = this.generateLinkEquipamento(equipamento);

    const result = await ModalPresentUtil(
      this.modalCtrl,
      QrcodeViewerPage,
      {
        qrcode: encodeURI(CUSTOMER_CONFIGS.QRCode.Link + link),
        titulo: equipamento.tag,
        subtitulo: `${baseAtiva.nome} - ${equipamento.tipoEquipamento}`,
        logo: CUSTOMER_CONFIGS.QRCode.Logo,
        footer: CUSTOMER_CONFIGS.QRCode.Link,

        link
      },
      'large-modal'
    );
  }
  async visualizarRegistro(equipamento: IEquipamento) {
    await ModalPresentUtil(
      this.modalCtrl,
      RegisterViewerPage,
      {
        title: `Visualizar equipamento: ${equipamento.tag}`,
        fields: EQUIPAMENTOS_VIEWER_FIELDS,
        data: equipamento
      },
      'large-modal',
      true
    );
  }

  public async abrirFormulario() {
    const result = await ModalPresentUtil(
      this.modalCtrl,
      EquipamentoCadastroPage,
      {},
      'large-modal'
    );

    if (result.role === ModalCloseStatus.CONFIRM) {
      this.list();
    }
  }
}
