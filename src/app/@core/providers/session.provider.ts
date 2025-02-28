import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {
  IBaseAcesso,
  IUsuario
} from 'src/app/interno/controle-acesso/controle-acesso.interfaces';
import { API } from 'src/environments/environment';
import { IPermissoes } from '../interfaces/permissoes.interface';
import { PermissoesHabilitadasMock } from '../mocks/session.mocks';
import { HttpProvider } from './http.provider';
import { StorageProvider } from './storage.provider';

@Injectable({ providedIn: 'root' })
export class SessionStorage extends StorageProvider<IUsuario> {
  constructor(protected storage: Storage) {
    super('session', storage);
  }
}
@Injectable({ providedIn: 'root' })
export class BaseAcessoAtivaStorage extends StorageProvider<IBaseAcesso> {
  constructor(protected storage: Storage) {
    super('base-acesso-ativa', storage);
  }
}

@Injectable({ providedIn: 'root' })
export class SessionApi {
  constructor(private readonly httpProvider: HttpProvider) {}

  async login(user: string, senha: string): Promise<IUsuario> {
    const login = await this.httpProvider.post<IUsuario>(`${API}login/`, {
      user,
      senha
    });

    return login;
  }
}

@Injectable({ providedIn: 'root' })
export class SessionProvider {
  public session: IUsuario;
  public baseAtiva: IBaseAcesso;

  token: string;

  permissoes: IPermissoes = PermissoesHabilitadasMock();

  constructor(
    private sessionStorage: SessionStorage,
    private baseAcessoAtivaStorage: BaseAcessoAtivaStorage,
    private navCtrl: NavController
  ) {}

  async isLogged(): Promise<boolean> {
    const hasSession = !!(await this.getSession());
    this.getBaseAtiva();
    return hasSession;
  }

  async setSession(session: IUsuario): Promise<void> {
    this.session = session;
    await this.sessionStorage.set(session);
  }

  async getSession(): Promise<IUsuario> {
    let session = this.session;

    if (!session) {
      session = await this.sessionStorage.get();
      this.session = session;
    }

    return session;
  }

  async setBaseAtiva(baseAtiva: IBaseAcesso): Promise<void> {
    this.baseAtiva = baseAtiva;
    await this.baseAcessoAtivaStorage.set(baseAtiva);
  }

  async getBaseAtiva(): Promise<IBaseAcesso> {
    let baseAtiva = this.baseAtiva;

    if (!baseAtiva) {
      baseAtiva = await this.baseAcessoAtivaStorage.get();
      this.baseAtiva = baseAtiva;
    }

    return baseAtiva;
  }

  async logout() {
    await this.setSession(null);
    await this.setBaseAtiva(null);

    this.navCtrl.navigateRoot('/acesso');
  }
}
