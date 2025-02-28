import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class StatusBarProvider {
  constructor(private platform: Platform) {}

  async statusBarPrimary() {
    try {
      if (!this.platform.is('android') && !this.platform.is('ios')) {
        return;
      }

      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#4aa17f' });
    } catch (err) {
      console.error('Não foi possível alterar a cor da status bar', err);
    }
  }
}
