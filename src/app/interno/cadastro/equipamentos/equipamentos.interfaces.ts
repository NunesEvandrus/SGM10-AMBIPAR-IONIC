import { IListagemItem } from '@my-core/components/listagem-selecao/listagem-selecao.interfaces';
import { ListagemItensFromObject } from '@my-core/components/listagem-selecao/listagem-selecao.utils';
import { IControlOption } from '@my-core/components/my-form/my-form.types';

export enum StatusEquipamento {
  NAO_OPERACIONAL = 'Não Operacional',
  OPERACIONAL = 'Operacional'
}

export const STATUS_EQUIPAMENTO_MAP = {
  [StatusEquipamento.NAO_OPERACIONAL]: 'Não Operacional',
  [StatusEquipamento.OPERACIONAL]: 'Operacional'
};

export const STATUS_EQUIPAMENTO_OPTIONS: IListagemItem[] =
  ListagemItensFromObject(STATUS_EQUIPAMENTO_MAP);

export interface IEquipamento {
  id: number;
  tag: string;
  tipoEquipamento: string;
  tipoEquipamentoId: string;
  marca: string;
  peso: string;
  volume: string;
  dataCompra: Date;
  valorEstimado: number;
  nrSerie: string;
  modelo: string;
  detalhe: string;
  observacao: string;
  baseOperacional: string;
  statusEquEnum: StatusEquipamento;
  qtdContratual: number;
  qtdComodato: number;
  qtdAtual: number;
  qtdReposicao: number;
  unidade: string;
  proprietario?: any;
  foto: string;
}

export type IEquipamentosControlOption = IControlOption & {
  TipoEquipamentoId: string;
};

export interface IPlanoManutencao {
  id: number;
  nome: string;
}
