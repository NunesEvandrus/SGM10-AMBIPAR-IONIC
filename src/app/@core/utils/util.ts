import { DatePipe } from '@angular/common';
import { FormatoData } from '@my-core/enums/FormatoDataEnum';

export class Utils {
  public static converteDataParaFormato(
    data: Date,
    formato: FormatoData
  ): string {
    const dataRecebida = new Date(data);
    if (!(dataRecebida instanceof Date) || isNaN(dataRecebida.getTime())) {
      throw new Error('Data inválida');
    }

    const datepipe: DatePipe = new DatePipe('pt-BR');
    const dataFormatada = datepipe.transform(dataRecebida, formato);
    return dataFormatada ?? '';
  }
}
