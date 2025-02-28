export interface IRegisterField {
  Key: string;
  Label: string;
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
  Formatter?: (value: any, item: any) => string | any;
}

export const CreateRegisterField = (
  key: string,
  label: string,
  colSize = 6,
  formatter?: (value: any, item: any) => string | any
): IRegisterField => ({
  Key: key,
  Label: label,
  ColSize: {
    Size: colSize,
  },
  Formatter: formatter,
});
