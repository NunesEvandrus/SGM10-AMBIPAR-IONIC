import { TemplateRef } from '@angular/core';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface ISorting<T> {
  SortColumn: keyof T;
  SortDirection: SortDirection;
}

export interface IColumn {
  Key: string;
  NoSort?: true;
  CssClass?: string;
  Label: string;
  Template?: TemplateRef<any>;
  Formatter?: (value: any, item: any, subitem?: any) => string | any;
  ExportFormatter?: (value: any, item: any, subitem?: any) => string | any;
  HideContent?: (value: any, item: any, subitem?: any) => boolean;
}

export interface IGroupColumn {
  CssClass?: string;
  ColSpan?: number;
  Label: string;
}

export interface IPaginator {
  Page: number;
  PageSize: number;
}

export interface IFilter {
  [key: string]: any;
}

export type ListParams<T> = IPaginator & ISorting<T> & IFilter;

export interface IRetornoList<T> {
  Items: T[];
  Total: number;
}

export const PAGE_SIZES = [10, 15, 25, 50, 100, 0];
