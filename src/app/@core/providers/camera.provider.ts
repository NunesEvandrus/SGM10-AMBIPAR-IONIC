import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { OurError } from '../utils/our-error.utils';

@Injectable({ providedIn: 'root' })
export class CameraProvider {
  constructor() {}

  async getPhoto(source: CameraSource) {
    document.body.setAttribute('camera-modal-type', source.toLocaleLowerCase());

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source,
      quality: 65,
      allowEditing: false,
      presentationStyle: 'fullscreen',
      saveToGallery: true,
      promptLabelHeader: 'Escolha a origem da foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Câmera'
    });

    return await this.getDataUrlFromWebPath(photo.webPath);
  }

  async getDataUrlFromWebPath(webPath: string) {
    if (!webPath) {
      new OurError('A foto não foi obtida');
    }

    const response = await fetch(webPath);
    const blob = await response.blob();
    return await this.blobToDataUrl(blob);
  }

  async blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        resolve(e.target.result as string);
      };

      fileReader.onerror = (e) => {
        reject(
          new OurError(
            'Não foi possível converter a foto para o formato adequado.',
            e
          )
        );
      };

      fileReader.readAsDataURL(blob);
    });
  }
}
