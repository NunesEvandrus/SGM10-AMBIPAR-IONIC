import { formatNumber } from '@angular/common';

export const FormataNumero = (value: number | any) => {
  value = value || 0;

  if (isNaN(value)) {
    console.error(value + ' não é um número. Foi substituído por zero.');
    value = 0;
  }

  return formatNumber(value, 'pt', '1.1-2');
};

export const ArredondaDecimal = (value: number, decimalPlaces: number = 3) => {
  const divider = Math.pow(10, decimalPlaces);

  const rounded = Math.round(value * divider) / divider;

  return rounded;
};
