import { ModalController } from '@ionic/angular';

type ComponentRef = Function | HTMLElement | string | null;

export const ModalPresentUtil = async <T extends any>(
  modalCtrl: ModalController,
  component: ComponentRef,
  componentProps?: any,
  cssClass?: string,
  backdropDismiss = false
) => {
  const modal = await modalCtrl.create({
    component,
    componentProps,
    cssClass,
    backdropDismiss
  });

  modal.present();

  const data = await modal.onDidDismiss<T>();

  return data;
};
