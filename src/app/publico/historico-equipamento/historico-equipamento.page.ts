import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { IColumn } from '@my-core/components/grid';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { SessionProvider } from '@my-core/providers/session.provider';
import { ModalPresentUtil } from '@my-core/utils/modal.utils';
import { EQUIPAMENTOS_VIEWER_FIELDS } from 'src/app/interno/cadastro/equipamentos/equipamentos.constants';
import { OrdemServicoFinalizarPage } from 'src/app/interno/ordens-servico/ordem-servico-finalizar/ordem-servico-finalizar.page';
import {
  IOrdemServico,
  ORDEM_SERVICO_INTERVALO_MAP,
  OrdemServicoIntervalo
} from 'src/app/interno/ordens-servico/ordens-servico.interfaces';
import { EquipamentoHistoricoApi } from './historico-equipamento.api';
import { IHistoricoEquipamento } from './historico-equipamento.interfaces';

@Component({
  selector: 'app-historico-equipamento',
  templateUrl: './historico-equipamento.page.html',
  styleUrls: ['./historico-equipamento.page.scss']
})
export class HistoricoEquipamentoPage implements OnInit {
  @ViewChild('observacoesCell', { static: true })
  observacoesCell: TemplateRef<any>;

  @ViewChild('finalizarCell', { static: true })
  finalizarCell: TemplateRef<any>;

  equipamentoId: number;
  fields = EQUIPAMENTOS_VIEWER_FIELDS;
  equipamento: IHistoricoEquipamento = {} as any;

  loading = true;

  abas = {
    Proximas: 'proximas',
    Executadas: 'executadas',
    Planejamento: 'planejamento'
  };

  abaAtiva = this.abas.Proximas;

  columns: IColumn[];
  isLogged = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private equipamentoHistoricoApi: EquipamentoHistoricoApi,
    private sessionProvider: SessionProvider,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    try {
      this.isLogged = await this.sessionProvider.isLogged();

      this.equipamentoId = +this.activatedRoute.snapshot.params.equipamentoId;

      if (!this.isLogged) {
        return this.navCtrl.navigateRoot(
          '/acesso/historico-equipamento/' + this.equipamentoId
        );
      }

      this.atualizaGridManutencoes();

      this.equipamento = await this.equipamentoHistoricoApi.buscaHistorico(
        this.equipamentoId
      );
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  }

  atualizaGridManutencoes() {
    const columns: IColumn[] = [
      {
        Label: 'OS',
        Key: 'id',
        NoSort: true
      },
      {
        Label: 'Tipo OS',
        Key: 'tipoOS',
        NoSort: true,
        Formatter: (tipo: OrdemServicoIntervalo) =>
          ORDEM_SERVICO_INTERVALO_MAP[tipo] || tipo
      },
      {
        Label: 'Data',
        Key: 'data',
        NoSort: true,
        Formatter: (data) => formatDate(data, 'dd/MM/Y', 'pt-BR')
      },
      {
        Label: 'Status',
        Key: 'statusProgramacao',
        NoSort: true
      },
      {
        Label: 'Status Eq.',
        Key: 'statusEquipamento',
        NoSort: true
      }
    ];

    if (this.abaAtiva === this.abas.Executadas) {
      columns.push({
        Label: 'Obs.',
        Key: 'observacao',
        NoSort: true,
        Template: this.observacoesCell
      });
    }

    if (this.abaAtiva === this.abas.Proximas && this.isLogged) {
      columns.push({
        Label: 'Executar',
        Key: 'id',
        NoSort: true,
        Template: this.finalizarCell
      });
    }

    this.columns = columns;
  }

  async finalizarOrdemServico(ordemServico?: IOrdemServico) {
    console.log(ordemServico);
    const result = await ModalPresentUtil(
      this.modalCtrl,
      OrdemServicoFinalizarPage,
      { id: ordemServico.id },
      'large-modal'
    );
    if (result.role === ModalCloseStatus.CONFIRM) {
      this.ngOnInit();
    }
  }
}
