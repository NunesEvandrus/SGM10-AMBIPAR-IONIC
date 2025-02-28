import { toastController } from '@ionic/core';

type ToastColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark';

export const ToastPresent = async (
  color: ToastColors,
  header: string,
  message?: string
) => {
  const toast = await toastController.create({
    color,
    header,
    message,
    position: 'top',
    duration: 3500
  });

  toast.present();

  return toast;
};

export const ToastSuccess = (header: string, message?: string) =>
  ToastPresent('success', header, message);

export const ToastDanger = (header: string, message?: string) =>
  ToastPresent('danger', header, message);

export const ToastWarning = (header: string, message?: string) =>
  ToastPresent('warning', header, message);

export const ToastDefault = (header: string, message?: string) =>
  ToastPresent('dark', header, message);
