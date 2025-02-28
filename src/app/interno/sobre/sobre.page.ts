import { Component, OnInit } from '@angular/core';
import { SessionProvider } from '@my-core/providers/session.provider';
import { APP_VERSION, CUSTOMER_CONFIGS } from 'src/environments/environment';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss']
})
export class SobrePage implements OnInit {
  baseAtiva: string;
  appVersion = APP_VERSION;
  logoMenu = CUSTOMER_CONFIGS.LogoMenu;

  constructor(private readonly sessionProvider: SessionProvider) {}

  async ngOnInit() {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();
    this.baseAtiva = baseAtiva.nome;
  }
}
