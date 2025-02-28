import { Injectable } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({ providedIn: 'root' })
export class SplashScreenProvider {
  constructor() {}

  async hide() {
    try {
      await SplashScreen.hide();
    } catch (err) {
      console.error('Não foi possível esconder a splash screen', err);
    }
  }
}
