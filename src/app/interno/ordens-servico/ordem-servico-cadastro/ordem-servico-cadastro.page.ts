import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { BaseFormPage } from '@my-core/abstracts-pages/form.base-page';
import {
  ControlType,
  IControl,
  InputType
} from '@my-core/components/my-form/my-form.types';
import { GeraSelectRobusto } from '@my-core/components/my-form/my-form.utils';
import { SessionProvider } from '@my-core/providers/session.provider';
import { AlertOurError } from '@my-core/utils/alert.utils';
import { EquipamentosApi } from '../../cadastro/equipamentos/equipamentos.api';
import { IEquipamentosControlOption } from '../../cadastro/equipamentos/equipamentos.interfaces';
import { OrdensServicoApi } from '../ordens-servico.api';
import { OrdemServicoTipo } from '../ordens-servico.enum';
import { INovaOrdemServico } from '../ordens-servico.interfaces';

@Component({
  selector: 'app-ordem-servico-cadastro',
  templateUrl: './ordem-servico-cadastro.page.html',
  styleUrls: ['./ordem-servico-cadastro.page.scss']
})
export class OrdemServicoCadastroPage
  extends BaseFormPage<INovaOrdemServico>
  implements OnInit
{
  formValue: Partial<INovaOrdemServico> = {};
  tipoPlano: OrdemServicoTipo;
  documentUrl =
    'http://localhost:49572/Relatorio/PrintInventario?baseLogado=43';

  planoIdFormControl = GeraSelectRobusto('planoId', 'Plano de Manutenção', [], {
    ColSize: 6,
    Validators: [Validators.required]
  });

  equipamentos: IEquipamentosControlOption[] = [];

  formControls: IControl[] = [];

  constructor(
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    private readonly sessionProvider: SessionProvider,
    private readonly equipamentosApi: EquipamentosApi,
    private readonly ordensServicoApi: OrdensServicoApi
  ) {
    super('ordem de serviço', modalCtrl, alertCtrl);
  }

  ngOnInit() {
    const camposEspecificos =
      this.tipoPlano === OrdemServicoTipo.PREVENTIVAS ||
      this.tipoPlano === OrdemServicoTipo.POS_OPERACAO
        ? [this.planoIdFormControl]
        : ([
            {
              Key: 'tarefa',
              Type: ControlType.INPUT,
              Params: {
                Label: 'Tarefa',
                Placeholder: '',
                Type: InputType.TEXT,
                Validators: [Validators.required]
              },
              ColSize: {
                Size: 12
              }
            },
            {
              Key: 'tempoEstimadoHoras',
              Type: ControlType.INPUT,
              Params: {
                Label: 'Tempo estimado (horas)',
                Placeholder: '00',
                Type: InputType.NUMBER,
                Validators: [Validators.required]
              },
              ColSize: {
                Size: 6
              }
            },
            {
              Key: 'tempoEstimadoMinutos',
              Type: ControlType.INPUT,
              Params: {
                Label: 'Tempo estimado (minutos)',
                Placeholder: '00',
                Type: InputType.NUMBER,
                Validators: [Validators.required]
              },
              ColSize: {
                Size: 6
              }
            }
          ] as IControl[]);
    this.formControls = [
      GeraSelectRobusto('equipamentoId', 'Equipamento', [], {
        ColSize: 6,
        Validators: [Validators.required]
      }),
      ...camposEspecificos,
      {
        Key: 'data',
        Type: ControlType.DATE,
        Params: {
          Label: 'Data',
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 6
        }
      }
    ];
    this.init();
  }

  async prepareForm() {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();
    this.equipamentos = await this.equipamentosApi.listaTodosOptions(
      baseAtiva.id
    );

    for (const control of this.formControls) {
      switch (control.Key) {
        case 'equipamentoId':
          control.Params.Options = this.equipamentos;
          break;
      }
    }

    this.formValue = { ...this.formValue };
  }

  async persisteRegistro(registro: INovaOrdemServico) {
    registro.tipoPlano = this.tipoPlano;
    await this.ordensServicoApi.criarProgramacao(registro);
  }

  async atualizaInformacoes(ev: { field: string; form: UntypedFormGroup }) {
    try {
      this.loading = true;

      if (
        ev.field === 'equipamentoId' &&
        (this.tipoPlano === OrdemServicoTipo.PREVENTIVAS ||
          this.tipoPlano === OrdemServicoTipo.POS_OPERACAO)
      ) {
        ev.form.controls.planoId.setValue(null);

        const equipamentoId = ev.form.controls.equipamentoId?.value;
        if (equipamentoId) {
          const tipoEquipamentoId = this.equipamentos.find(
            (eq) => eq.Key === equipamentoId
          ).TipoEquipamentoId;

          const planosManutencao =
            await this.equipamentosApi.getPlanosManutencao(tipoEquipamentoId);

          this.planoIdFormControl.Params.Options = planosManutencao.map(
            (plano) => ({ Key: plano.id, Label: plano.nome })
          );
        }
      }
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Não foi possível carregar a tela',
        err
      );
    }
    this.loading = false;
  }
}
