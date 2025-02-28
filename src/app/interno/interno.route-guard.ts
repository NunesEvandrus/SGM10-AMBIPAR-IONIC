import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SessionProvider } from '../@core/providers/session.provider';

@Injectable()
export class InternoRouteGuard {
  constructor(
    private sessionProvider: SessionProvider,
    private navCtrl: NavController
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const logado = await this.sessionProvider.isLogged();

    if (!logado) {
      this.navCtrl.navigateRoot('/acesso');
    }

    return logado;
  }
}
