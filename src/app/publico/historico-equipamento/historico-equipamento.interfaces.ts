import { IEquipamento } from 'src/app/interno/cadastro/equipamentos/equipamentos.interfaces';
import { IOrdemServico } from 'src/app/interno/ordens-servico/ordens-servico.interfaces';

export interface IHistoricoEquipamento extends IEquipamento {
  proximas: IOrdemServico[];
  executadas: IOrdemServico[];
  planejamento: IOrdemServico[];
}
