import { Injectable } from '@angular/core';
import { HttpProvider } from '@my-core/providers/http.provider';
import { API } from 'src/environments/environment';
import { IHistoricoEquipamento } from './historico-equipamento.interfaces';

@Injectable({ providedIn: 'root' })
export class EquipamentoHistoricoApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async buscaHistorico(equipamentoId: number): Promise<IHistoricoEquipamento> {
    const equipamentoHistorico =
      await this.httpProvider.get<IHistoricoEquipamento>(
        `${API}equipamento/${equipamentoId}/historicoDetalhado`,
        {}
      );

    return equipamentoHistorico;
  }
}
