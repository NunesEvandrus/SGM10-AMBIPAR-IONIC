import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BaseListPage } from '@my-core/abstracts-pages/list.base-page';
import { IFilter, IPaginator, ISorting } from '@my-core/components/grid';
import { sortFilterAndPaginateItems } from '@my-core/components/grid/grid.utils';
import { IControl } from '@my-core/components/my-form/my-form.types';
import {
  GeraCampoSimples,
  GeraDateRangeSimples,
  GeraSelectSimples
} from '@my-core/components/my-form/my-form.utils';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { SessionProvider } from '@my-core/providers/session.provider';
import { ModalPresentUtil } from '@my-core/utils/modal.utils';
import { STATUS_EQUIPAMENTO_OPTIONS } from '../cadastro/equipamentos/equipamentos.interfaces';
import { OrdemServicoCadastroPage } from './ordem-servico-cadastro/ordem-servico-cadastro.page';
import { OrdemServicoFinalizarPage } from './ordem-servico-finalizar/ordem-servico-finalizar.page';
import { OrdensServicoApi } from './ordens-servico.api';
import { ORDEM_SERVICO_TIPO_MAP } from './ordens-servico.constants';
import { OrdemServicoTipo } from './ordens-servico.enum';
import {
  IOrdemServico,
  ORDEM_SERVICO_INTERVALO_MAP,
  ORDEM_SERVICO_INTERVALO_OPTIONS,
  OrdemServicoIntervalo,
  STATUS_PROGRAMACAO_OPTIONS,
  StatusProgramacao
} from './ordens-servico.interfaces';
import { OrdemServicoImpressaPage } from './ordem-servico-impressa/ordem-servico-impressa.page';
import { OrdemServicoImpressaConcluidaPage } from './ordem-servico-impressa-concluida/ordem-servico-impressa-concluida.page';
import { FormatoData } from '@my-core/enums/FormatoDataEnum';
import { Utils } from '@my-core/utils/util';

@Component({
  selector: 'app-ordens-servico',
  templateUrl: './ordens-servico.page.html',
  styleUrls: ['./ordens-servico.page.scss']
})
export class OrdensServicoPage
  extends BaseListPage<IOrdemServico>
  implements OnInit
{
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('actionsCel2', { static: true }) actionsCel2: TemplateRef<any>;

  statusProgramacao = StatusProgramacao;

  filterControls: IControl[];

  filterMaps = {};

  tipoPlano: OrdemServicoTipo;

  constructor(
    protected modalCtrl: ModalController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public sessionProvider: SessionProvider,
    private ordensServicoApi: OrdensServicoApi
  ) {
    super(modalCtrl, activatedRoute, router);
    this.title = 'Ordens de Serviço';
  }

  async ngOnInit() {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();
    this.tipoPlano = +this.activatedRoute.snapshot.params.tipoPlano;
    this.title += ` - ${ORDEM_SERVICO_TIPO_MAP[this.tipoPlano]} - ${
      baseAtiva.nome
    }`;

    this.columns = [
      {
        Label: 'OS',
        Key: 'id'
      },
      ...(this.tipoPlano === OrdemServicoTipo.PREVENTIVAS
        ? [
            {
              Label: 'Tipo OS',
              Key: 'tipoOS',
              Formatter: (tipo: OrdemServicoIntervalo) =>
                ORDEM_SERVICO_INTERVALO_MAP[tipo]
            }
          ]
        : []),
      {
        Label: 'Tipo de Equipamento',
        Key: 'tipoEquipamento'
      },
      {
        Label: 'TAG',
        Key: 'tag'
      },
      {
        Label: 'Data',
        Key: 'data',
        Formatter: (data) => formatDate(data, 'dd/MM/Y', 'pt-BR')
      },
      {
        Label: 'Status Eq.',
        Key: 'statusEquipamento'
      },
      {
        Label: 'Status',
        Key: 'statusProgramacao',
        Template: this.actionsCel2
      },
      {
        Label: 'Ações',
        CssClass: 'ws-nowrap',
        Key: 'id',
        NoSort: true,
        Template: this.actionsCell
      }
    ];

    this.filterControls = [
      GeraCampoSimples('id', 'ID'),
      ...(this.tipoPlano === OrdemServicoTipo.PREVENTIVAS
        ? [
            GeraSelectSimples(
              'tipoOS.Exact',
              'Intervalo',
              ORDEM_SERVICO_INTERVALO_OPTIONS
            )
          ]
        : []),
      GeraCampoSimples('tipoEquipamento', 'Tipo de Equipamento'),
      GeraCampoSimples('tag', 'TAG'),
      ...GeraDateRangeSimples('data'),
      GeraSelectSimples(
        'statusEquipamento.Exact',
        'Status do Equipamento',
        STATUS_EQUIPAMENTO_OPTIONS
      ),
      GeraSelectSimples(
        'statusProgramacao.Exact',
        'Status da Ordem de Serviço',
        STATUS_PROGRAMACAO_OPTIONS
      )
    ];

    this.init();
  }

  async getItems(
    paginator: IPaginator,
    sorting: ISorting<IOrdemServico>,
    filter: IFilter
  ) {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();

    const registros = await this.ordensServicoApi.listaTodos(
      baseAtiva.id,
      this.tipoPlano
    );

    if (Object.keys(filter).length === 0) {
      // Se o objeto filter está vazio, adicione data.DateDe e data.DateAte
      filter = {
        'data.DateDe': Utils.converteDataParaFormato(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          FormatoData.yyyyMMdd
        ),
        'data.DateAte': Utils.converteDataParaFormato(
          new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          FormatoData.yyyyMMdd
        )
      };
    } else {
      // Se o objeto filter já tem algum elemento, mantenha esses elementos e adicione data.DateDe e data.DateAte
      filter = {
        ...filter
        // 'data.DateDe': Utils.converteDataParaFormato(
        //   new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        //   FormatoData.yyyyMMdd
        // ),
        // 'data.DateAte': Utils.converteDataParaFormato(
        //   new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        //   FormatoData.yyyyMMdd
        // )
      };
    }
    const result = sortFilterAndPaginateItems(
      registros,
      { ...paginator, ...sorting },
      filter
    );
    return result;
  }

  async adicionarProgramacao() {
    const result = await ModalPresentUtil(
      this.modalCtrl,
      OrdemServicoCadastroPage,
      { tipoPlano: this.tipoPlano },
      'large-modal'
    );
    if (result.role === ModalCloseStatus.CONFIRM) {
      this.list();
    }
  }

  async exibirOrdemImpressa(idOs: Number) {
    const result = await ModalPresentUtil(
      this.modalCtrl,
      OrdemServicoImpressaPage,
      { id: idOs },
      'large-modal'
    );
    if (result.role === ModalCloseStatus.CONFIRM) {
      this.list();
    }
  }
  async exibirOrdemImpressaConcluida(idOs: Number) {
    const result = await ModalPresentUtil(
      this.modalCtrl,
      OrdemServicoImpressaConcluidaPage,
      { id: idOs },
      'large-modal'
    );
    if (result.role === ModalCloseStatus.CONFIRM) {
      this.list();
    }
  }

  async finalizarOrdemServico(ordemServico?: IOrdemServico) {
    const result = await ModalPresentUtil(
      this.modalCtrl,
      OrdemServicoFinalizarPage,
      { id: ordemServico.id },
      'large-modal'
    );
    if (result.role === ModalCloseStatus.CONFIRM) {
      this.list();
    }
  }

  async funcaoNaoImplementada(ordemServico?: IOrdemServico) {
    alert('Funcionalidade ainda não implementada');
  }
}
