import { ChangeDetectorRef, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NetworkProvider } from '@my-core/providers/network.provider';
import { SplashScreenProvider } from '@my-core/providers/splash-screen.provider';
import { StatusBarProvider } from '@my-core/providers/status-bar.provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly statusBar: StatusBarProvider,
    private readonly splashScreen: SplashScreenProvider,
    public readonly network: NetworkProvider,
    private readonly ref: ChangeDetectorRef,
    private readonly storage: Storage,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.platform.ready();
    await this.storage.create();

    await this.statusBar.statusBarPrimary();
    setTimeout(async () => {
      await this.splashScreen.hide();
      await this.statusBar.statusBarPrimary();
    }, 1000);
    setTimeout(async () => {
      await this.statusBar.statusBarPrimary();
    }, 2000);

    this.network.listenNetworkStatus(this.ref);
  }
}
