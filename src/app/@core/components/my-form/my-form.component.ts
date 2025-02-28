import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import { ModalPresentUtil } from '../../utils/modal.utils';
import { ListagemSelecaoPage } from '../listagem-selecao/listagem-selecao.page';
import {
  IPhotoCaptureReturn,
  PhotoCapturePage
} from '../photo-capture/photo-capture.page';
import { ControlType, IControl, IControlOption } from './my-form.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit, OnChanges {
  @Input() submitText = 'Salvar';
  @Input() submitColor = 'primary';
  @Input() secundaryButtonText = '';
  @Input() secundaryButtonColor = 'warning';
  @Input() warningText: string;
  @Input() controls: IControl[] = [];
  @Input() value: { [Key: string]: any } = {};
  @Input() loading = false;
  @Output() mySubmit = new EventEmitter();
  @Output() myChange = new EventEmitter();
  @Output() secundaryButtonClick = new EventEmitter();

  formGroup: UntypedFormGroup;
  controlTypes = ControlType;
  hasRequiredFields = false;

  changeEmitterEnabled = false;

  popoverOpen = {};

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.popoverOpen = {};
    this.createControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.controls) {
      this.syncControls();
    }
    if (changes.value && this.formGroup) {
      this.changeEmitterEnabled = false;
      for (const control of this.controls) {
        this.formGroup.controls[control.Key]?.setValue(this.value[control.Key]);
      }
      this.enableChangeEmitter();
    }
  }

  enableChangeEmitter() {
    setTimeout(() => {
      this.changeEmitterEnabled = true;
    }, 100);
  }

  createControls() {
    this.changeEmitterEnabled = false;
    this.formGroup = new UntypedFormGroup({});

    for (const control of this.controls) {
      const formControl = new UntypedFormControl();

      formControl.setValidators(control.Params.Validators);
      if (control.Params.Disabled) {
        formControl.disable();
      }

      control.Params.Required = formControl.hasValidator(Validators.required);

      if (control.Params.Required) {
        this.hasRequiredFields = true;
      }

      if (this.value[control.Key]) {
        formControl.setValue(this.value[control.Key]);
      }

      this.formGroup.addControl(control.Key, formControl);
    }
    this.enableChangeEmitter();
  }

  syncControls() {
    if (!this.formGroup) {
      return;
    }

    this.changeEmitterEnabled = false;

    for (const formCtrl in this.formGroup.controls) {
      if (!this.controls.find((control) => control.Key === formCtrl)) {
        this.formGroup.removeControl(formCtrl);
      }
    }

    for (const control of this.controls) {
      const controlPreExists = this.formGroup.controls[control.Key];
      const formControl = controlPreExists || new UntypedFormControl();

      formControl.setValidators(control.Params.Validators);
      if (control.Params.Disabled) {
        formControl.disable();
      }

      control.Params.Required = formControl.hasValidator(Validators.required);

      if (control.Params.Required) {
        this.hasRequiredFields = true;
      }

      if (this.value[control.Key]) {
        formControl.setValue(this.value[control.Key]);
      }

      if (!controlPreExists) {
        this.formGroup.addControl(control.Key, formControl);
      }
    }
    this.enableChangeEmitter();
  }

  submitForm() {
    this.mySubmit.emit(this.formGroup.value);
    /**
     * TODO
     *
     * ng-content para outros botões no form
     * opção de limpar formulário
     * ? tooltip em required em vez de dica lá em cima ? mobile seria possível ?
     * modal de filtro repassar as informações pra dentro e pra fora do form
     *
     * output do form
     * setar valor para os campos, em caso de edição, por ex
     * discriminar que tem algo preenchido, para o filtro, por ex
     * campos relacionados
     * export os controls para a tela interagir
     * emitir alterações do form, para selects associativos, por ex.
     */
  }

  propagateChange(ev, fieldChanged: string) {
    setTimeout(() => {
      if (this.changeEmitterEnabled) {
        this.myChange.emit({ field: fieldChanged, form: this.formGroup });
      }
    }, 50);
  }

  propagateSecundaryButtonClick() {
    this.secundaryButtonClick.emit();
  }

  async handleClickControl(control: IControl) {
    switch (control.Type) {
      case ControlType.PHOTO:
        this.takePhoto(control);
        break;
      case ControlType.SELECT_CUSTOM:
        this.selectCustom(control);
        break;
      case ControlType.TIME:
      case ControlType.DATE:
        this.popoverOpen[control.Key] = !this.popoverOpen[control.Key];
        break;
      default:
        break;
    }
  }

  async takePhoto(control: IControl) {
    const formCtrl = this.formGroup.get(control.Key);
    const result = await ModalPresentUtil<IPhotoCaptureReturn>(
      this.modalCtrl,
      PhotoCapturePage,
      {
        foto: formCtrl.value,
        cameraSource: CameraSource.Prompt
      }
    );

    if (result.role === ModalCloseStatus.CONFIRM) {
      this.propagateChange(null, control.Key);
      formCtrl.setValue(result.data.foto);
    }
  }

  async selectCustom(control: IControl) {
    const formCtrl = this.formGroup.get(control.Key);
    const { data: selecao, role: status } = await ModalPresentUtil(
      this.modalCtrl,
      ListagemSelecaoPage,
      {
        title: control.Params.Label,
        items: control.Params.Options,
        selecionado: !control.Params.Multi ? formCtrl?.value : null,
        selecionados: control.Params.Multi ? formCtrl?.value || [] : null,
        multiple: control.Params.Multi
      },
      'large-modal'
    );
    if (status === ModalCloseStatus.CONFIRM) {
      this.propagateChange(null, control.Key);
      formCtrl.setValue(selecao);
    }
  }

  findLabel(options: IControlOption[], value: string | number) {
    return options.find((item) => item.Key == value)?.Label || 'Item inválido';
  }
}
