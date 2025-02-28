import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalCloseStatus } from '../../enums/modal-close-status.enum';
import {
  IListagemItem,
  IListagemPageParams
} from './listagem-selecao.interfaces';

@Component({
  selector: 'app-listagem-selecao',
  templateUrl: './listagem-selecao.page.html',
  styleUrls: ['./listagem-selecao.page.scss']
})
export class ListagemSelecaoPage implements OnInit, IListagemPageParams {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: IListagemItem[] = [];

  @Input() multiple: boolean;

  itemsFiltrados: IListagemItem[] = [];

  @Input() selecionados: (number | string)[] = [];
  @Input() selecionado: number | string;

  internalSelecionados: (number | string)[] = [];
  internalSelecionado: number | string;

  searchText = '';

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.itemsFiltrados = this.items;
    this.internalSelecionados = this.selecionados ? [...this.selecionados] : [];
    this.internalSelecionado = this.selecionado;
  }

  fechar(role: ModalCloseStatus = ModalCloseStatus.CANCEL, data?: any) {
    this.modalCtrl.dismiss(data, role);
  }

  selecionarMultiplo(item: number | string) {
    const index = this.internalSelecionados.indexOf(item);
    if (index >= 0) {
      this.internalSelecionados.splice(index, 1);
    } else {
      this.internalSelecionados.push(item);
    }
  }

  isSelecionadoMultiplo(item: number | string) {
    return this.internalSelecionados.indexOf(item) >= 0;
  }

  selecionarUnico(item: number | string) {
    if (this.internalSelecionado === item) {
      this.internalSelecionado = null;
    } else {
      this.internalSelecionado = item;
    }
  }

  isSelecionadoUnico(item: number | string) {
    return this.internalSelecionado === item;
  }

  selecionar(item: number | string) {
    if (this.multiple) {
      this.selecionarMultiplo(item);
    } else {
      this.selecionarUnico(item);
    }
  }

  isSelecionado(item: number | string) {
    let selecionado = false;

    if (this.multiple) {
      selecionado = this.isSelecionadoMultiplo(item);
    } else {
      selecionado = this.isSelecionadoUnico(item);
    }

    return selecionado;
  }

  retornarSelecionados() {
    const selecionados = this.multiple
      ? this.internalSelecionados || []
      : this.internalSelecionado || null;

    this.fechar(ModalCloseStatus.CONFIRM, selecionados);
  }

  filtrar(event: any) {
    const searchText = event.target.value.toLocaleLowerCase().trim();
    this.itemsFiltrados = this.items.filter((item) => {
      const label = item.Label.toLocaleLowerCase().trim();
      const sublabel = (item.Sublabel || '').toLocaleLowerCase().trim();

      return label.includes(searchText) || sublabel.includes(searchText);
    });
  }
}
