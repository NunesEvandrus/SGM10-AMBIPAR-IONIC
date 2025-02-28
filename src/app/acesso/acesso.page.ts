import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import {
  SessionApi,
  SessionProvider
} from '@my-core/providers/session.provider';
import { AlertOurError } from '@my-core/utils/alert.utils';
import { OurError } from '@my-core/utils/our-error.utils';
import { APP_VERSION } from 'src/environments/environment';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.page.html',
  styleUrls: ['./acesso.page.scss']
})
export class AcessoPage implements OnInit {
  form: UntypedFormGroup;
  appVersion = APP_VERSION;
  equipamentoId: number;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private readonly alertCtrl: AlertController,
    private readonly navCtrl: NavController,
    private readonly loadingCtrl: LoadingController,
    private readonly sessionApi: SessionApi,
    private readonly sessionProvider: SessionProvider
  ) {}

  ngOnInit() {
    this.equipamentoId = +this.activatedRoute.snapshot.params.equipamentoId;
    this.form = new UntypedFormGroup({
      user: new UntypedFormControl('', [Validators.required]),
      senha: new UntypedFormControl('', [Validators.required])
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando credenciais'
    });
    await loading.present();

    try {
      const credenciais = this.form.value;
      const session = await this.sessionApi.login(
        credenciais.user,
        credenciais.senha
      );

      if (!session?.basesAcesso?.length) {
        throw new OurError(
          'Não há nenhuma base de acesso disponível para você. Consulte o administrador do sistema.'
        );
      }

      await this.sessionProvider.setSession(session);
      await this.sessionProvider.setBaseAtiva(session?.basesAcesso[0]);

      if (this.equipamentoId) {
        location.href = 'publico/historico-equipamento/' + this.equipamentoId;
      } else {
        this.navCtrl.navigateRoot('/');
      }
    } catch (err) {
      AlertOurError(this.alertCtrl, 'Login não realizado', err);
    }
    loading.dismiss();
  }
}
