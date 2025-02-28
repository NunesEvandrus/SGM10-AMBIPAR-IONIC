export interface IPermissao {
  Ver?: boolean;
  Cadastrar?: boolean;
  Editar?: boolean;
  Excluir?: boolean;
}
export interface IPermissoes {
  Dashboard: IPermissao;
  Cadastro: IPermissao;
  CadastroBaseOperacional: IPermissao;
  CadastroEquipamentos: IPermissao;
  CadastroPlanoManutencao: IPermissao;
  CadastroTiposEquipamentos: IPermissao;
  CadastroMateriais: IPermissao;
  OrdensServico: IPermissao;
  DiagnosticoFalhas: IPermissao;
  Ocorrencias: IPermissao;
  MovimentacaoEquipamentos: IPermissao;
  Graficos: IPermissao;
  RelatorioFalhas: IPermissao;
  RelatorioInspecaoAnual: IPermissao;
  Cronograma: IPermissao;
  ControleAcesso: IPermissao;
  Sobre: IPermissao;
}
