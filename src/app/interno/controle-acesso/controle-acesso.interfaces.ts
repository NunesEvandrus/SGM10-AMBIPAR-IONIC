import { IListagemItem } from '@my-core/components/listagem-selecao/listagem-selecao.interfaces';

export interface IBaseAcesso {
  id: number;
  nome: string;
}

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  user: string;
  senha: string;
  perfil: string;
  ativo: boolean;
  basesAcesso: IBaseAcesso[];
}
