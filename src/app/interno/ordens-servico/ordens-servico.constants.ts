import { OrdemServicoTipo } from './ordens-servico.enum';

export const ORDEM_SERVICO_TIPO_MAP = {
  [OrdemServicoTipo.PREVENTIVAS]: 'Preventivas',
  [OrdemServicoTipo.CORRETIVAS]: 'Corretivas',
  [OrdemServicoTipo.CORRETIVAS_SMS]: 'Corretivas SMS',
  [OrdemServicoTipo.POS_OPERACAO]: 'Pós-operação',
  [OrdemServicoTipo.PREDITIVA]: 'Preditiva',
  [OrdemServicoTipo.ORDEM_TESTE]: 'Ordem de teste',
};
