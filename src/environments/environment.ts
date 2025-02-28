export const environment = {
  production: false
};

export const API = 'https://localhost:5001/';
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
