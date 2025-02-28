import { AlertController, ModalController } from '@ionic/angular';
import { IControl } from '../components/my-form/my-form.types';
import { ModalCloseStatus } from '../enums/modal-close-status.enum';
import { AlertOurError, AlertSuccess } from '../utils/alert.utils';

interface IObjectLiteral {
  [key: string]: any;
}

export abstract class BaseFormPage<T extends IObjectLiteral> {
  id: string;
  loading = false;
  formValue: Partial<T> = {};
  formControls: IControl[] = [];

  constructor(
    public singularRegisterName = '',
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController
  ) {}

  async init() {
    try {
      this.loading = true;
      await this.prepareForm();
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Não foi possível carregar a tela',
        err
      );
      this.fechar();
    }
    this.loading = false;
  }

  fechar(role: ModalCloseStatus = ModalCloseStatus.CANCEL, data: any = null) {
    this.modalCtrl.dismiss(data, role);
  }

  async salvar(formValue: T) {
    if (this.loading) {
      return;
    }

    try {
      this.loading = true;

      await this.persisteRegistro(formValue);

      await AlertSuccess(this.alertCtrl, 'Registro salvo com sucesso.');

      this.fechar(ModalCloseStatus.CONFIRM, formValue);
    } catch (err) {
      await AlertOurError(this.alertCtrl, 'Não foi possível salvar', err);
    }
    this.loading = false;
  }

  abstract prepareForm(): Promise<void>;
  abstract persisteRegistro(registro: T): Promise<void>;
}
