import { Validators } from '@angular/forms';
import {
  ControlType,
  IControl,
  InputType
} from '@my-core/components/my-form/my-form.types';
import { GeraSelectRobusto } from '@my-core/components/my-form/my-form.utils';
import { IFuncionario, IMaterial } from '../ordens-servico.interfaces';

export const CreateInputsFinalizarOS = (
  funcionarios: IFuncionario[],
  addGerarCorretiva = false
) =>
  [
    {
      Key: 'programacaoId',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Ordem de serviço',
        Placeholder: 'BRA9S11',
        Type: InputType.TEXT,
        Validators: [Validators.required],
        Disabled: true
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'tag',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Equipamento',
        Placeholder: 'ABC-XYZ-123-321',
        Type: InputType.TEXT,
        Validators: [Validators.required],
        Disabled: true
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'data',
      Type: ControlType.DATE,
      Params: {
        Label: 'Data da programação',
        Validators: [Validators.required],
        Disabled: true
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'dataInicio',
      Type: ControlType.DATE,
      Params: {
        Label: 'Data de Início',
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'dataExecucao',
      Type: ControlType.DATE,
      Params: {
        Label: 'Data de Execução',
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'observacao',
      Type: ControlType.TEXTAREA,
      Params: {
        Label: 'Observações'
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'pendencias',
      Type: ControlType.TEXTAREA,
      Params: {
        Label: 'Pendências'
      },
      ColSize: {
        Size: 6
      }
    },
    GeraSelectRobusto(
      'funcionario1',
      '1º Funcionário envolvido',
      funcionarios.map((funcionario) => ({
        Key: funcionario.id,
        Label: funcionario.nome
      })),
      { ColSize: 6 }
    ),
    GeraSelectRobusto(
      'funcionario2',
      '2º Funcionário envolvido',
      funcionarios.map((funcionario) => ({
        Key: funcionario.id,
        Label: funcionario.nome
      })),
      { ColSize: 6 }
    ),
    GeraSelectRobusto(
      'funcionario3',
      '3º Funcionário envolvido',
      funcionarios.map((funcionario) => ({
        Key: funcionario.id,
        Label: funcionario.nome
      })),
      { ColSize: 6 }
    ),
    GeraSelectRobusto(
      'funcionario4',
      '4º Funcionário envolvido',
      funcionarios.map((funcionario) => ({
        Key: funcionario.id,
        Label: funcionario.nome
      })),
      { ColSize: 6 }
    ),
    {
      Key: 'horimetro',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Horímetro',
        Type: InputType.NUMBER,
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'tempoExecucao',
      Type: ControlType.TIME,
      Params: {
        Label: 'Tempo de execução (hh:mm)',
        Placeholder: 'hh:mm',
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    },
    {
      Key: 'gerarCorretiva',
      Type: ControlType.BOOLEAN,
      Params: {
        Label: 'Gerar corretiva',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    ...(addGerarCorretiva
      ? [
          {
            Key: 'descricaoCorretiva',
            Type: ControlType.INPUT,
            Params: {
              Label: 'Descrição corretiva',
              Type: InputType.TEXT
            },
            ColSize: {
              Size: 12
            }
          }
        ]
      : []),
    {
      Key: 'foto1',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto2',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto3',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto4',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto5',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto6',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto7',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    },
    {
      Key: 'foto8',
      Type: ControlType.PHOTO,
      Params: {
        Label: 'Foto da Execução',
        Validators: []
      },
      ColSize: {
        Size: 4
      }
    }
  ] as IControl[];

export const CreateInputsMateriais = (materiais: IMaterial[]) =>
  [
    GeraSelectRobusto(
      'id',
      'Material',
      materiais.map((material) => ({
        Key: material.id,
        Label: material.nomeMaterial
      })),
      { ColSize: 6 }
    ),
    {
      Key: 'quantidade',
      Type: ControlType.INPUT,
      Params: {
        Label: 'Quantidade',
        Type: InputType.NUMBER,
        Validators: [Validators.required]
      },
      ColSize: {
        Size: 6
      }
    }
  ] as IControl[];
