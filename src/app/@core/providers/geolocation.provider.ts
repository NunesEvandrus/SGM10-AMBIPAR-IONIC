import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { OurError } from '../utils/our-error.utils';

@Injectable({ providedIn: 'root' })
export class GeolocationProvider {
  constructor() {}

  async requestPermissions() {
    try {
      const permissionStatus = await Geolocation.requestPermissions({
        permissions: ['location', 'coarseLocation']
      });
    } catch (err) {
      if (err.message !== 'Not implemented on web.') {
        console.error('não foi possivel requisitar as permissões', err);
      }
    }
  }

  async getCurrentPosition() {
    try {
      await this.requestPermissions();
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      return {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
        Precisao: position.coords.accuracy
      };
    } catch (err) {
      throw new OurError(
        'Por favor, permita o acesso à sua localização ou ative o GPS e tente novamente.',
        err
      );
    }
  }
}
