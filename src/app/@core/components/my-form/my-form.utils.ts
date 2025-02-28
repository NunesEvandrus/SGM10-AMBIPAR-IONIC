import { ValidatorFn } from '@angular/forms';
import { IListagemItem } from '../listagem-selecao/listagem-selecao.interfaces';
import {
  ControlType,
  IControl,
  IControlOption,
  InputType,
  SELECT_OPTION_DEFAULT,
} from './my-form.types';

export const GeraCampoSimples = (
  key: string,
  label: string,
  colSize = 6
): IControl => ({
  Key: key,
  Type: ControlType.INPUT,
  Params: {
    Label: label,
    Type: InputType.TEXT,
  },
  ColSize: {
    Size: colSize,
  },
});

export const GeraDateRangeSimples = (key: string, colSize = 6): IControl[] => [
  {
    Key: `${key}.DateDe`,
    Type: ControlType.DATE,
    Params: {
      Label: 'A partir da data',
    },
    ColSize: {
      Size: colSize,
    },
  },
  {
    Key: `${key}.DateAte`,
    Type: ControlType.DATE,
    Params: {
      Label: 'Até a data',
    },
    ColSize: {
      Size: colSize,
    },
  },
];

export const GeraSelectSimples = (
  key: string,
  label: string,
  options: IListagemItem[],
  colSize = 6
): IControl => ({
  Key: key,
  Type: ControlType.SELECT,
  Params: {
    Label: label,
    Options: [SELECT_OPTION_DEFAULT, ...options],
    Multi: false,
  },
  ColSize: {
    Size: colSize,
  },
});

export const GeraSelectRobusto = (
  key: string,
  label: string,
  options: IControlOption[],
  config: {
    Multi?: boolean;
    Validators?: ValidatorFn[];
    ColSize?: number
  } = {}
): IControl => ({
  Key: key,
  Type: ControlType.SELECT_CUSTOM,
  Params: {
    Label: label,
    Multi: config?.Multi || false,
    Validators: config?.Validators || [],
    Options: options,
  },
  ColSize: {
    Size: config?.ColSize || 4,
  },
});
