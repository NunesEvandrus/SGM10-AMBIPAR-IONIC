import { ValidatorFn } from '@angular/forms';

export const SELECT_OPTION_DEFAULT = { Key: null, Label: 'Todos' };
export const SELECT_BOOLEAN_OPTIONS = [
  { Key: 'true', Label: 'Sim' },
  { Key: 'false', Label: 'Não' }
];

export enum ControlType {
  INPUT = 1,
  TEXTAREA,
  DATE,
  TIME,
  BOOLEAN,
  SELECT, // multi ou unico
  SELECT_CUSTOM, // multi ou unico
  PHOTO,
  HIDDEN
}

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel'
}

export interface IControlOption {
  Key: string | number;
  Label: string;
}

interface IControlParams {
  Label: string;
  Placeholder?: string;
  Validators?: ValidatorFn[];
  /**
   * Definido automaticamente
   */
  Required?: boolean;
  Disabled?: true;
  Type?: InputType;
  Multi?: boolean;
  Options?: IControlOption[];
}

interface IControlBase {
  Key: string;
  Params: IControlParams;
  ColSize?: {
    Size?: number;
    /**
     * Valor padrão é 12
     */
    SizeXs?: number;
    SizeSm?: number;
    SizeMd?: number;
    SizeLg?: number;
    SizeXl?: number;
  };
}

interface IControlGeneric extends IControlBase {
  Type:
    | ControlType.TEXTAREA
    | ControlType.DATE
    | ControlType.TIME
    | ControlType.BOOLEAN
    | ControlType.PHOTO
    | ControlType.SELECT_CUSTOM;
}

interface IControlParamsInput extends IControlParams {
  Type: InputType;
}

interface IControlInput extends IControlBase {
  Type: ControlType.INPUT;
  Params: IControlParamsInput;
}

interface IControlParamsSelect extends IControlParams {
  Multi: boolean;
  Options: IControlOption[];
}

interface IControlSelect extends IControlBase {
  Type: ControlType.SELECT;
  Params: IControlParamsSelect;
}

export type IControl = IControlInput | IControlSelect | IControlGeneric;
