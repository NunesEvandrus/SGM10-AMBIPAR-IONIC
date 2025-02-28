import { TemplateRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPresentUtil } from '../../utils/modal.utils';
import {
  IListagemItem,
  IListagemPageParams
} from './listagem-selecao.interfaces';
import { ListagemSelecaoPage } from './listagem-selecao.page';

const AbreListagemSelecao = async <
  T extends string | string[] | number | number[]
>(
  modalCtrl: ModalController,
  params: IListagemPageParams
) => {
  const { data: selecao, role: status } = await ModalPresentUtil<T>(
    modalCtrl,
    ListagemSelecaoPage,
    params,
    'large-modal'
  );

  return { selecao, status };
};

export const AbreListagemSelecaoUnica = async (
  modalCtrl: ModalController,
  title: string,
  items: IListagemItem[],
  selecionado: number | string,
  template?: TemplateRef<any>
) =>
  AbreListagemSelecao<string | number>(modalCtrl, {
    title,
    template,
    items,
    multiple: false,
    selecionado
  });

export const AbreListagemSelecaoMultipla = async (
  modalCtrl: ModalController,
  title: string,
  items: IListagemItem[],
  selecionados: (number | string)[],
  template?: TemplateRef<any>
) =>
  AbreListagemSelecao<string[] | number[]>(modalCtrl, {
    title,
    template,
    items,
    multiple: true,
    selecionados
  });

export const ListagemItensFromObject = (obj: {
  [key: string | number]: string;
}) =>
  Object.keys(obj).map((key) => ({
    Key: key,
    Label: obj[key]
  }));
