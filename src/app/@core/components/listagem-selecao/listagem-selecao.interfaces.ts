import { TemplateRef } from '@angular/core';

export interface IListagemItem {
  Key: string | number;
  Label: string;
  Sublabel?: string;
  Active?: boolean;
}

export interface IListagemPageParams {
  title: string;
  template: TemplateRef<any>;
  items: IListagemItem[];
  multiple?: boolean;
  selecionados?: (number | string)[];
  selecionado?: number | string;
}
