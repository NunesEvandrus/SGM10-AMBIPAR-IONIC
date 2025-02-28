import { IPermissoes } from '../interfaces/permissoes.interface';

export const UsuarioMock = () => {
  console.error('UsuarioMock em uso');

  return {
    Foto: 'assets/usuario-icone.svg',
    Nome: 'Fulano'
  };
};

export const PermissoesHabilitadasMock = (): IPermissoes => {
  console.error('PermissoesHabilitadasMock em uso');

  return {
    Dashboard: { Ver: true },
    Cadastro: { Ver: true },
    CadastroBaseOperacional: { Ver: true },
    CadastroEquipamentos: { Ver: true },
    CadastroPlanoManutencao: { Ver: true },
    CadastroTiposEquipamentos: { Ver: true },
    CadastroMateriais: { Ver: true },
    OrdensServico: { Ver: true },
    DiagnosticoFalhas: { Ver: false },
    Ocorrencias: { Ver: true },
    MovimentacaoEquipamentos: { Ver: true },
    Graficos: { Ver: true },
    RelatorioFalhas: { Ver: true },
    RelatorioInspecaoAnual: { Ver: true },
    Cronograma: { Ver: true },
    ControleAcesso: { Ver: true },
    Sobre: { Ver: true }
  };
};
