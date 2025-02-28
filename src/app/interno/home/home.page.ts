import { Component, OnInit } from '@angular/core';
import { SessionProvider } from '@my-core/providers/session.provider';
import { OurError } from '@my-core/utils/our-error.utils';
import { APP_VERSION } from 'src/environments/environment';
import { HomeApi, IIndicador } from './home.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  baseAtiva: string;
  appVersion = APP_VERSION;
  indicadores: IIndicador[];
  erro: string;

  constructor(
    private readonly sessionProvider: SessionProvider,
    private readonly homeApi: HomeApi
  ) {}

  async ngOnInit() {
    try {
      this.erro = null;
      const baseAtiva = await this.sessionProvider.getBaseAtiva();
      this.baseAtiva = baseAtiva.nome;

      this.indicadores = await this.homeApi.indicadores(baseAtiva.id);
      for (const indicador of this.indicadores) {
        indicador.titulo =
          indicador.titulo == 'CONCLUIDA' ? 'CONCLUÍDA' : indicador.titulo;
      }
    } catch (err) {
      this.erro =
        err instanceof OurError ? err.message : 'Por favor, tente novamente.';
    }
  }
}
