import { Injectable } from '@angular/core';
import { HttpProvider } from '@my-core/providers/http.provider';
import { API } from 'src/environments/environment';

export interface IIndicador {
  titulo: string;
  icone: string;
  total: string | number;
}

@Injectable({ providedIn: 'root' })
export class HomeApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async indicadores(baseOpId: number): Promise<IIndicador[]> {
    const dataAtual = new Date();
    const semanaPassada = new Date();
    semanaPassada.setDate(semanaPassada.getDate() - 7);
    const indicadores = await this.httpProvider.get<IIndicador[]>(
      `${API}home/base/${baseOpId}/dataInicial/${semanaPassada
        .toISOString()
        .substring(0, 10)}/dataFinal/${dataAtual
        .toISOString()
        .substring(0, 10)}`,
      {}
    );

    return indicadores;
  }
}
