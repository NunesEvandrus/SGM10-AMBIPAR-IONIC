import { Pipe, PipeTransform } from '@angular/core';
import { FormataNumero } from '../utils/number.utils';

@Pipe({
  name: 'formataNumero'
})
export class FormataNumeroPipe implements PipeTransform {
  constructor() {}

  public transform(value: any): string {
    return FormataNumero(value);
  }
}
