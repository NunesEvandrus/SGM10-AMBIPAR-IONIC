import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '@my-core/enums/modal-close-status.enum';
import { IFilter } from '..';
import { IControl } from '../../my-form/my-form.types';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter.modal.html',
  styleUrls: ['./filter.modal.scss'],
})
export class FilterModal {
  @Input() submitText = 'Filtrar';
  @Input() headerColor = 'secondary';
  @Input() controls: IControl[] = [];
  @Input() filter: IFilter = {};

  constructor(private readonly modalCtrl: ModalController) {}

  fechar(data?: any, role = ModalCloseStatus.CANCEL) {
    this.modalCtrl.dismiss(data, role);
  }

  filterPropagate(filter: IFilter) {
    this.fechar(filter, ModalCloseStatus.CONFIRM);
  }
}
