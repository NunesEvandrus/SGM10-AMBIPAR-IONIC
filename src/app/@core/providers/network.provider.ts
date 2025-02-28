import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class NetworkProvider {
  status: ConnectionStatus = { connected: true, connectionType: 'unknown' };

  ref: ChangeDetectorRef;

  constructor() {}

  get online() {
    return this.status.connected;
  }

  get offline() {
    return !this.status.connected;
  }

  async listenNetworkStatus(ref: ChangeDetectorRef) {
    Network.addListener('networkStatusChange', (status) => {
      this.status = status;

      ref.detectChanges();
    });

    this.status = await Network.getStatus();
    ref.detectChanges();
  }
}
