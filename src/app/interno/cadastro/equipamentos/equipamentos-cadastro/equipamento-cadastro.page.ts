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
import { EquipamentosApi } from '../equipamentos.api';
import {
  IEquipamento,
  IEquipamentosControlOption
} from '../equipamentos.interfaces';

@Component({
  selector: 'app-equipamento-cadastro',
  templateUrl: './equipamento-cadastro.page.html',
  styleUrls: ['./equipamento-cadastro.page.scss']
})
export class EquipamentoCadastroPage
  extends BaseFormPage<IEquipamento>
  implements OnInit
{
  formValue: Partial<IEquipamento> = {};

  equipamentos: IEquipamentosControlOption[] = [];

  formControls: IControl[] = [];

  constructor(
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    private readonly sessionProvider: SessionProvider,
    private readonly equipamentosApi: EquipamentosApi
  ) {
    super('ordem de serviço', modalCtrl, alertCtrl);
  }

  ngOnInit() {
    const camposEspecificos = [
      {
        Key: 'tag',
        Type: ControlType.INPUT,
        Params: {
          Label: 'TAG',
          Placeholder: 'ABC-XYZ-123-321',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      },
      {
        Key: 'marca',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Marca',
          Placeholder: '',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      },
      {
        Key: 'peso',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Peso',
          Placeholder: '00',
          Type: InputType.NUMBER,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 6
        }
      },
      {
        Key: 'volume',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Volume',
          Placeholder: '00',
          Type: InputType.NUMBER,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 6
        }
      },
      {
        Key: 'dataCompra',
        Type: ControlType.DATE,
        Params: {
          Label: 'Data',
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 6
        }
      },
      {
        Key: 'valorEstimado',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Valor Estimado',
          Placeholder: '00',
          Type: InputType.NUMBER,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 6
        }
      },
      {
        Key: 'nrSerie',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Número de Série',
          Placeholder: '',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      },
      {
        Key: 'modelo',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Modelo',
          Placeholder: '',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      },
      {
        Key: 'detalhe',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Detalhe Adicional',
          Placeholder: '',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      },
      {
        Key: 'observacao',
        Type: ControlType.INPUT,
        Params: {
          Label: 'Observação',
          Placeholder: '',
          Type: InputType.TEXT,
          Validators: [Validators.required]
        },
        ColSize: {
          Size: 12
        }
      }
    ] as IControl[];
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

  async persisteRegistro(registro: IEquipamento) {
    await this.equipamentosApi.salvaEquipamento(registro);
  }

  async atualizaInformacoes(ev: { field: string; form: UntypedFormGroup }) {
    // try {
    //   this.loading = true;
    //   if (
    //     ev.field === 'equipamentoId' &&
    //     (this.tipoPlano === OrdemServicoTipo.PREVENTIVAS ||
    //       this.tipoPlano === OrdemServicoTipo.POS_OPERACAO)
    //   ) {
    //     ev.form.controls.planoId.setValue(null);
    //     const equipamentoId = ev.form.controls.equipamentoId?.value;
    //     if (equipamentoId) {
    //       const tipoEquipamentoId = this.equipamentos.find(
    //         (eq) => eq.Key === equipamentoId
    //       ).TipoEquipamentoId;
    //       const planosManutencao =
    //         await this.equipamentosApi.getPlanosManutencao(tipoEquipamentoId);
    //       this.planoIdFormControl.Params.Options = planosManutencao.map(
    //         (plano) => ({ Key: plano.id, Label: plano.nome })
    //       );
    //     }
    //   }
    // } catch (err) {
    //   await AlertOurError(
    //     this.alertCtrl,
    //     'Não foi possível carregar a tela',
    //     err
    //   );
    // }
    // this.loading = false;
  }
}
