import { IPermissao, IPermissoes } from './permissoes.interface';

export interface IMenuItem {
  Rota: string;
  Icone?: string;
  Rotulo: string;
  Funcionalidade?: keyof IPermissoes;
  Permissao?: keyof IPermissao;
}

export interface IMenuGrupo {
  Icone: string;
  Rotulo: string;
  Submenus?: IMenuItem[];
}

export type IMenu = IMenuItem | IMenuGrupo;
