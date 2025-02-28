import { IMenu } from '../@core/interfaces/menu.interface';
import { ORDEM_SERVICO_TIPO_MAP } from './ordens-servico/ordens-servico.constants';

export const MENU: IMenu[] = [
  {
    Rota: '/home',
    Icone: 'bar-chart-outline',
    Rotulo: 'Dashboard',
    Funcionalidade: 'Dashboard',
    Permissao: 'Ver'
  },
  {
    Icone: 'reader-outline',
    Rotulo: 'Cadastro',
    Submenus: [
      {
        Rota: '/cadastro/base-operacional',
        Rotulo: 'Base Operacional',
        Funcionalidade: 'CadastroBaseOperacional',
        Permissao: 'Ver'
      },
      {
        Rota: '/cadastro/equipamentos',
        Rotulo: 'Equipamentos',
        Funcionalidade: 'CadastroEquipamentos',
        Permissao: 'Ver'
      },
      {
        Rota: '/cadastro/plano-manutencao',
        Rotulo: 'Plano de Manutenção',
        Funcionalidade: 'CadastroPlanoManutencao',
        Permissao: 'Ver'
      },
      {
        Rota: '/cadastro/tipos-equipamentos',
        Rotulo: 'Tipos de Equipamentos',
        Funcionalidade: 'CadastroTiposEquipamentos',
        Permissao: 'Ver'
      },
      {
        Rota: '/cadastro/materiais',
        Rotulo: 'Materiais',
        Funcionalidade: 'CadastroMateriais',
        Permissao: 'Ver'
      }
    ]
  },
  {
    Icone: 'construct-outline',
    Rotulo: 'Ordens de Serviço',
    Funcionalidade: 'OrdensServico',
    Permissao: 'Ver',
    Submenus: Object.keys(ORDEM_SERVICO_TIPO_MAP).map((tipoId) => ({
      Rota: `/ordens-servico/tipo/${tipoId}`,
      Rotulo: ORDEM_SERVICO_TIPO_MAP[tipoId]
    }))
  },
  {
    Rota: '/diagnostico-falhas',
    Icone: 'layers-outline',
    Rotulo: 'Diagnóstico de Falhas',
    Funcionalidade: 'DiagnosticoFalhas',
    Permissao: 'Ver'
  },
  {
    Rota: '/ocorrencias',
    Icone: 'chatbubble-ellipses-outline',
    Rotulo: 'Ocorrências',
    Funcionalidade: 'Ocorrencias',
    Permissao: 'Ver'
  },
  {
    Rota: '/movimentacao-equipamentos',
    Icone: 'git-compare-outline',
    Rotulo: 'Mov. Equipamentos',
    Funcionalidade: 'MovimentacaoEquipamentos',
    Permissao: 'Ver'
  },
  {
    Rota: '/graficos',
    Icone: 'chatbubble-ellipses-outline',
    Rotulo: 'Gráficos',
    Funcionalidade: 'Graficos',
    Permissao: 'Ver'
  },
  {
    Icone: 'newspaper-outline',
    Rotulo: 'Relatórios',
    Submenus: [
      {
        Rota: '/relatorio-falhas',
        Rotulo: 'Relatório de Falhas',
        Funcionalidade: 'RelatorioFalhas',
        Permissao: 'Ver'
      },
      {
        Rota: '/relatorio-inspecao-anual',
        Rotulo: 'Relatório de Inspeção Anual',
        Funcionalidade: 'RelatorioInspecaoAnual',
        Permissao: 'Ver'
      }
    ]
  },
  {
    Rota: '/cronograma',
    Icone: 'calendar-outline',
    Rotulo: 'Cronograma',
    Funcionalidade: 'Cronograma',
    Permissao: 'Ver'
  },
  {
    Rota: '/controle-acesso',
    Icone: 'key-outline',
    Rotulo: 'Controle de Acesso',
    Funcionalidade: 'ControleAcesso',
    Permissao: 'Ver'
  },
  {
    Rota: '/sobre',
    Icone: 'help-outline',
    Rotulo: 'Sobre',
    Funcionalidade: 'Sobre',
    Permissao: 'Ver'
  }
];
