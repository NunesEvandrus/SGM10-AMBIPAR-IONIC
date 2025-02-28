import { Injectable } from '@angular/core';
import { HttpProvider } from '@my-core/providers/http.provider';
import { API } from 'src/environments/environment';
import {
  IEquipamento,
  IEquipamentosControlOption,
  IPlanoManutencao
} from './equipamentos.interfaces';

@Injectable({ providedIn: 'root' })
export class EquipamentosApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async listaTodos(baseOpId: number): Promise<IEquipamento[]> {
    const equipamentos = await this.httpProvider.get<IEquipamento[]>(
      `${API}equipamento/listaTodos/base/${baseOpId}`,
      {}
    );

    return equipamentos;
  }

  async listaTodosOptions(
    baseOpId: number
  ): Promise<IEquipamentosControlOption[]> {
    const equipamentos = await this.listaTodos(baseOpId);

    return equipamentos.map((item) => ({
      Key: item.id,
      Label: item.tipoEquipamento + ' - ' + item.tag,
      TipoEquipamentoId: item.tipoEquipamentoId
    }));
  }

  async getPlanosManutencao(
    tipoEquipamentoId: string
  ): Promise<IPlanoManutencao[]> {
    const planosManutencao = await this.httpProvider.get<IPlanoManutencao[]>(
      `${API}plano/TipoEquipamento/${tipoEquipamentoId}`,
      {}
    );

    return planosManutencao;
  }

  async salvaEquipamento(equipamento: IEquipamento): Promise<void> {
    // const planosManutencao = await this.httpProvider.get<IPlanoManutencao[]>(
    //   `${API}plano/TipoEquipamento/${tipoEquipamentoId}`,
    //   {}
    // );
    // return planosManutencao;
  }
}
