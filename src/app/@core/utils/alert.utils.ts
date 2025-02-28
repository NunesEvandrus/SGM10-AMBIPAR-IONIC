import { AlertController } from '@ionic/angular';
import { AlertCloseStatus } from '../enums/alert-close-status.enum';
import { OurError } from './our-error.utils';

export const AlertConfirm = async (
  alertCtrl: AlertController,
  header: string,
  message?: string,
  confirmText = 'Sim',
  cancelText = 'Não'
) => {
  const alert = await alertCtrl.create({
    header,
    message,
    backdropDismiss: false,
    keyboardClose: false,
    buttons: [
      {
        text: confirmText,
        role: AlertCloseStatus.CONFIRM
      },
      {
        text: cancelText,
        role: AlertCloseStatus.CANCEL
      }
    ]
  });

  await alert.present();
  const result = await alert.onDidDismiss();

  const confirmed = result.role === AlertCloseStatus.CONFIRM;

  return confirmed;
};

export const AlertDefault = async (
  alertCtrl: AlertController,
  header: string,
  message?: string,
  cssClass?: string
) => {
  const alert = await alertCtrl.create({
    header,
    message,
    backdropDismiss: false,
    keyboardClose: false,
    buttons: ['Ok'],
    cssClass
  });

  await alert.present();
  await alert.onDidDismiss();
};

export const AlertSuccess = async (
  alertCtrl: AlertController,
  header: string,
  message?: string
) => {
  await AlertDefault(alertCtrl, header, message, 'success-feedback');
};

export const AlertWarning = async (
  alertCtrl: AlertController,
  header: string,
  message?: string
) => {
  await AlertDefault(alertCtrl, header, message, 'warning-feedback');
};

export const AlertOurError = async (
  alertCtrl: AlertController,
  header: string,
  exception: Error,
  message = 'Por favor, tente novamente.'
) => {
  let backdropColor = 'danger-feedback';

  if (exception instanceof OurError) {
    message = exception.message;

    if (!exception.originalError) {
      backdropColor = 'warning-feedback';
    }
  } else {
    console.error(exception);
  }

  await AlertDefault(alertCtrl, header, message, backdropColor);
};
