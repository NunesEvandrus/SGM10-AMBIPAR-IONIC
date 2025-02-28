import { formatDate } from '@angular/common';
import {
  CreateRegisterField,
  IRegisterField
} from '@my-core/components/register-viewer/register-viewer.types';

export const EQUIPAMENTOS_VIEWER_FIELDS: IRegisterField[] = [
  CreateRegisterField('id', 'Id', 3),
  CreateRegisterField('tag', 'Tag', 3),
  CreateRegisterField('tipoEquipamento', 'Tipo de equipamento', 6),

  CreateRegisterField('marca', 'Marca', 3),
  CreateRegisterField('peso', 'Peso', 3),
  CreateRegisterField('volume', 'Volume', 3),
  CreateRegisterField('unidade', 'Unidade', 3),

  CreateRegisterField('dataCompra', 'Data de compra', 3, (data) =>
    formatDate(data, 'dd/MM/Y HH:mm', 'pt-BR')
  ),
  CreateRegisterField('valorEstimado', 'Valor estimado', 3),
  CreateRegisterField('nrSerie', 'Nº de série', 3),
  CreateRegisterField('modelo', 'Modelo', 3),

  CreateRegisterField('qtdContratual', 'Quant. contratual', 3),
  CreateRegisterField('qtdComodato', 'Quant. comodato', 3),
  CreateRegisterField('qtdAtual', 'Quant. atual', 3),
  CreateRegisterField('qtdReposicao', 'Quant. reposição', 3),

  CreateRegisterField('baseOperacional', 'Base operacional', 3),
  CreateRegisterField('statusEquEnum', 'Status', 3),
  CreateRegisterField('proprietario', 'Proprietário', 3),
  CreateRegisterField(
    'foto',
    'Foto',
    3,
    (foto) =>
      `<a href="https://link-da-foto.com/${foto}" target="_blank">Ver foto</a>`
  ),

  CreateRegisterField('detalhe', 'Detalhe', 6),
  CreateRegisterField('observacao', 'Observações', 6)
];
