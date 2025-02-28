import { IListagemItem } from '@my-core/components/listagem-selecao/listagem-selecao.interfaces';
import { ListagemItensFromObject } from '@my-core/components/listagem-selecao/listagem-selecao.utils';
import { StatusEquipamento } from '../cadastro/equipamentos/equipamentos.interfaces';
import { OrdemServicoTipo } from './ordens-servico.enum';

export enum StatusProgramacao {
  DISPONIVEL = 'Disponivel',
  CONCLUIDA = 'Concluída',
  SUSPENSA = 'Suspensa',
  NAO_REALIZADA = 'Não realizada',
  PLANEJADA = 'Planejada',
  EM_ANDAMENTO = 'Em Andamento'
}

export const STATUS_PROGRAMACAO_MAP = {
  [StatusProgramacao.DISPONIVEL]: 'Disponivel',
  [StatusProgramacao.CONCLUIDA]: 'Concluída',
  [StatusProgramacao.SUSPENSA]: 'Suspensa',
  [StatusProgramacao.NAO_REALIZADA]: 'Não realizada',
  [StatusProgramacao.PLANEJADA]: 'Planejada',
  [StatusProgramacao.EM_ANDAMENTO]: 'Em Andamento'
};

export const STATUS_PROGRAMACAO_OPTIONS: IListagemItem[] =
  ListagemItensFromObject(STATUS_PROGRAMACAO_MAP);

export enum OrdemServicoIntervalo {
  DECENDIAL = 'DECENDIAL',
  MENSAL = 'MENSAL',
  TRIMESTRAL = 'TRIMESTRAL',
  SEMESTRAL = 'SEMESTRAL',
  ANUAL = 'ANUAL'
}
export const ORDEM_SERVICO_INTERVALO_MAP = {
  [OrdemServicoIntervalo.DECENDIAL]: 'Decendial',
  [OrdemServicoIntervalo.MENSAL]: 'Mensal',
  [OrdemServicoIntervalo.TRIMESTRAL]: 'Trimestral',
  [OrdemServicoIntervalo.SEMESTRAL]: 'Semestral',
  [OrdemServicoIntervalo.ANUAL]: 'Anual'
};

export const ORDEM_SERVICO_INTERVALO_OPTIONS: IListagemItem[] =
  ListagemItensFromObject(ORDEM_SERVICO_INTERVALO_MAP);

export interface INovaOrdemServicoBase {
  equipamentoId: number;
  data: string;
  tipoPlano: number;
  progPaiId?: number;
  usuario?: string;
}
export interface INovaOrdemServicoOutras extends INovaOrdemServicoBase {
  tarefa: string;
  tempoEstimadoHoras: number;
  tempoEstimadoMinutos: number;
}

export interface INovaOrdemServicoPreventiva extends INovaOrdemServicoBase {
  planoId: number;
}
export interface INovaOrdemServicoOutras {
  equipamentoId: number;
  tarefa: string;
  tempoEstimadoHoras: number;
  tempoEstimadoMinutos: number;
  data: string;
  progPaiId?: number;
  usuario?: string;
}
export type INovaOrdemServico =
  | INovaOrdemServicoPreventiva
  | INovaOrdemServicoOutras;

export interface IOrdemServico {
  id: number;
  tipoOS: OrdemServicoIntervalo & OrdemServicoTipo;
  tipoEquipamento: string;
  tag: string;
  data: string;
  observacao: string;
  statusProgramacao: StatusProgramacao;
  statusEquipamento: StatusEquipamento;
}

export interface IOrdemServicoTarefa {
  planId: number;
  nome: string;
  descricao: string;
  ordem: number;
  id: number;
  usuario: string;
  dataCriacao: string;
  notifications: any[];
  invalid: boolean;
  valid: boolean;
}

export interface IOrdemServicoCompleta extends IOrdemServico {
  planoId: number;
  equipamentoId: number;
  progPaiId: number;
  tarefas: IOrdemServicoTarefa[];
  materiais: IMaterial[];
}

export interface IOrdemServicoFinalizar {
  // Propriedades pegas no backend mesmo a partir da programacaoId:
  data?: string;
  tag?: string;
  equipamentoId?: 0;
  planoId?: 0;
  progPaiId?: 0;

  // id do item clicado no grid
  programacaoId: number; // os.id

  // usuario logado = identificador
  usuario?: string;

  // daqui pra baixo é formulário
  dataInicio: string;
  dataExecucao: string;

  observacao: string;
  pendencia: string;

  funcionario1?: number;
  funcionario2?: number;
  funcionario3?: number;
  funcionario4?: number;

  horimetro?: number;

  tempoExecucao?: string;
  tempoExecucaoH?: number;
  tempoExecucaoM?: number;

  tarefas: number[];
  materiais: IMaterialUtilizado[];

  gerarCorretiva: boolean;
  descricaoCorretiva?: string;

  /*
    dataExecucao:   "2023-06-11T02:09:00-03:00"
    funcionario1:   20
    funcionario2:   23
    funcionario3:   24
    funcionario4:   27
    gerarCorretiva: false
    horimetro:      "123"
    observacao:    "teste obs"
    pendencias:     "teste pendencias"
    tempoExecucaoH: 8
    tempoExecucaoM: 50
    usuario:        "EVANDRO"
   */
}

export interface IFuncionario {
  id: string;
  nome: string;
}

export interface IMaterial {
  id: number;
  nomeMaterial: string;
  referencia: string;
  codigo: string;
  codigoSAP: string;
  fabricante: string;
  marca: string;
  tipoMaterial: TipoMaterialEnum;
  valorUnitario: number;
  foto: string;
  usuario: string;
  unidade: UnidadeEnum;
  quantidade: number;
  marcado: boolean;
}

export enum TipoMaterialEnum {
  SOBREASSALENTE = 'Sobressalente',
  CONSUMIVEL = 'Consumível'
}

export enum UnidadeEnum {
  Kilo = 'Kg',
  Grama = 'g',
  Litro = 'L',
  Mililitro = 'mL',
  Metro = 'm',
  Centimentro = 'cm',
  Unidade = 'Un',
  Peça = 'Peça'
}

export interface IMaterialUtilizado extends IMaterial {
  id: number;
  nome: string;
  quantidade: number;
  unidade: UnidadeEnum;
}
