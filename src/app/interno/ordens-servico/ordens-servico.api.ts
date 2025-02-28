import { Injectable } from '@angular/core';
import { HttpProvider } from '@my-core/providers/http.provider';
import { API } from 'src/environments/environment';
import { ORDEM_SERVICO_TIPO_MAP } from './ordens-servico.constants';
import { OrdemServicoTipo } from './ordens-servico.enum';
import {
  IFuncionario,
  IMaterial,
  IMaterialUtilizado,
  INovaOrdemServico,
  IOrdemServico,
  IOrdemServicoCompleta,
  IOrdemServicoFinalizar,
  OrdemServicoIntervalo
} from './ordens-servico.interfaces';

@Injectable({ providedIn: 'root' })
export class OrdensServicoApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async funcionarios(baseOpId: number): Promise<IFuncionario[]> {
    const funcionarios = await this.httpProvider.get<IFuncionario[]>(
      `${API}funcionario/listaTodos/base/${baseOpId}`,
      {}
    );

    return funcionarios;
  }

  async listaMateriais(): Promise<IMaterial[]> {
    const materiais = await this.httpProvider.get<IMaterial[]>(
      `${API}material/listaTodos/`,
      {}
    );

    return materiais;
  }

  async recuperaMaterialById(id: Number): Promise<IMaterialUtilizado> {
    const material = await this.httpProvider.get<IMaterialUtilizado>(
      `${API}material/${id}`,
      {}
    );

    return material;
  }

  async listaTodos(
    baseOpId: number,
    tipoId: OrdemServicoTipo
  ): Promise<IOrdemServico[]> {
    const ordensServico = await this.httpProvider.get<IOrdemServico[]>(
      `${API}programacao/listaTodos/base/${baseOpId}`,
      {}
    );

    const preventivasIntervalos = Object.values(OrdemServicoIntervalo);

    return ordensServico.filter(
      (os) =>
        os.tipoOS === ORDEM_SERVICO_TIPO_MAP[tipoId]?.toUpperCase() ||
        (tipoId === OrdemServicoTipo.PREVENTIVAS &&
          preventivasIntervalos.includes(os.tipoOS))
    );
  }

  async buscaProgramacao(programacao: string): Promise<IOrdemServicoCompleta> {
    const ordemServico = await this.httpProvider.get<IOrdemServicoCompleta>(
      `${API}programacao/${programacao}`,
      {}
    );

    return ordemServico;
  }

  async criarProgramacao(novaOrdem: INovaOrdemServico): Promise<any> {
    novaOrdem.usuario = this.httpProvider.session.session.user;
    novaOrdem.progPaiId = 0;

    const feedback = await this.httpProvider.post<any>(
      `${API}programacao/criar`,
      novaOrdem
    );

    return feedback;
  }

  async finalizarProgramacao(novaOrdem: IOrdemServicoFinalizar): Promise<any> {
    novaOrdem.usuario = this.httpProvider.session.session.user;
    console.log(novaOrdem);

    const feedback = await this.httpProvider.post<any>(
      `${API}programacao/finalizar`,
      novaOrdem
    );

    console.log(feedback);

    return feedback;
  }

  async salvarFotoProgramacao(
    osId: string,
    foto: string,
    extensao: string = 'jpg'
  ): Promise<any> {
    const dadosFoto = {
      osId,
      foto,
      extensao,
      usuario: this.httpProvider.session.session.user
    };

    const feedback = await this.httpProvider.post<any>(
      `${API}programacao/uploadFoto`,
      dadosFoto
    );

    console.log(feedback);

    return feedback;
  }
}
