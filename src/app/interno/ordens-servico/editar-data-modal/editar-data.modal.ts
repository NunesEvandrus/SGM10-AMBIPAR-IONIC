import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  ControlType,
  IControl,
  InputType
} from 'src/app/@core/components/my-form/my-form.types';
import { ModalCloseStatus } from 'src/app/@core/enums/modal-close-status.enum';
import { IOrdemServico } from '../ordens-servico.interfaces';

@Component({
  selector: 'app-editar-data-modal',
  templateUrl: './editar-data.modal.html',
  styleUrls: ['./editar-data.modal.scss']
})
export class EditarDataModal {
  @Input() ordemServico: IOrdemServico;

  controls: IControl[] = [
    {
      Key: 'OrdemServicoId',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Ordem de Serviço',
        Type: InputType.NUMBER,
        Disabled: true
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'Tag',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Equipamento',
        Type: InputType.TEXT,
        Disabled: true
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'DataProgramada',
      Type: ControlType.DATE,
      Params: {
        Label: 'Data de execução',
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'Observacao',
      Type: ControlType.TEXTAREA,
      Params: {
        Label: 'Observação',
        Placeholder: 'Observações ou ressalvas.'
      },
      ColSize: {
        Size: 12
      }
    }
  ];

  constructor(private readonly modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }

  salvar(value) {
    this.modalCtrl.dismiss(value, ModalCloseStatus.CONFIRM);
  }
}
