import { Injectable } from '@angular/core';
import { HttpProvider } from '@my-core/providers/http.provider';
import { API } from 'src/environments/environment';
import { IUsuario } from './controle-acesso.interfaces';

@Injectable({ providedIn: 'root' })
export class ControleAcessoApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async listaTodos(): Promise<IUsuario[]> {
    const usuarios = await this.httpProvider.get<IUsuario[]>(
      `${API}login/listaTodos`,
      {}
    );

    return usuarios;
  }
}
