import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import { AlertDefault } from '../../utils/alert.utils';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss']
})
export class MapsPage implements OnInit {
  geolocalizacao: {
    Latitude: number;
    Longitude: number;
    Precisao: number;
  };
  src: string;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.geolocalizacao) {
      this.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD9rZG1rGHB9gsU8hpJGPbYvI7QdoBtrko
      &q=${this.geolocalizacao.Latitude},${this.geolocalizacao.Longitude}&zoom=18`;
    } else {
      AlertDefault(
        this.alertCtrl,
        'Mapa não carregado',
        'Latitude e longitude não foram informados'
      );
      this.fechar();
    }
  }

  fechar() {
    this.modalCtrl.dismiss(null, ModalCloseStatus.CANCEL);
  }
}
