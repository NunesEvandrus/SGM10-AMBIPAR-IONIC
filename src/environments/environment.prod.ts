export const environment = {
  production: true
};

export const API = 'https://api.ecnsystem.com.br/';
export const CUSTOMER_CONFIGS = {
  LogoLogin: 'assets/logo-nomeado.svg',
  LogoMenu: 'assets/logo-nomeado.svg',
  EquipamentosManutencaoLink: (equipamentoId: number) =>
    `/publico/historico-equipamento/${equipamentoId}`,
  QRCode: {
    Logo: 'assets/cda/logo-branco.svg',
    Link: 'https://sgm10.ecnsystem.com.br'
  },
  OSConcluida:
    'https://navemestra.sgm10.com.br/Programacao/VisualizarOSConcluida/',
  OSNova: 'https://navemestra.sgm10.com.br/Programacao/VisualizarOS/'
};

export const APP_VERSION = require('../../package.json').version;
