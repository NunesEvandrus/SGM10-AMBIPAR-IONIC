import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import {
  IColumn,
  IFilter,
  IPaginator,
  ISorting,
  ListParams,
  PAGE_SIZES,
  SortDirection as SortDirectionEnum
} from '../components/grid';
import { FilterModal } from '../components/grid/filter-modal/filter.modal';
import { IControl } from '../components/my-form/my-form.types';
import { ModalCloseStatus } from '../enums/modal-close-status.enum';
import { ModalPresentUtil } from '../utils/modal.utils';
import { ExtractErrorMessage } from '../utils/our-error.utils';
import { ToastDanger } from '../utils/toast.utils';

interface IObjectLiteral {
  [key: string]: any;
}
@Component({ template: '' })
export abstract class BaseListPage<T extends IObjectLiteral> {
  loading = false;
  headerFilterColor = 'primary';
  title: string = '';
  sorting: ISorting<T>;
  filter: IFilter = {};
  hasFilter = false;
  filterControls: IControl[] = [];
  paginator: IPaginator = {
    PageSize: PAGE_SIZES[0],
    Page: 1
  };

  columns: IColumn[] = [];

  items: T[] = [];

  total = 0;

  destroyedComponent = false;

  constructor(
    protected modalCtrl: ModalController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  async init() {
    await this.prepareParamsFromQueryParams();

    await this.list();
  }

  ngOnDestroy() {
    this.destroyedComponent = true;
    this.items = null;
    this.activatedRoute = null;
    this.router = null;
  }

  async prepareParamsFromQueryParams() {
    const params: ListParams<T> = (await this.activatedRoute.queryParams
      .pipe(take(1))
      .toPromise()) as any;

    const { SortColumn, SortDirection, Page, PageSize, ...filter } = params;

    if (SortColumn) {
      this.sorting = { SortColumn, SortDirection };
      this.paginator = { Page: +Page, PageSize: +PageSize };
      this.prepareFilter(this.filter, filter);
    }
  }

  abstract getItems(
    paginator: IPaginator,
    sorting: ISorting<T>,
    filter: IFilter
  ): Promise<{ Items: T[]; Total: number }>;

  async list() {
    try {
      this.loading = true;

      if (!this.sorting) {
        this.sorting = {
          SortColumn: this.columns[0].Key,
          SortDirection: SortDirectionEnum.ASC
        };
      }

      if (this.destroyedComponent) return;

      this.prepareFilter(this.filter, {});

      if (this.destroyedComponent) return;
      const { Total: total, Items: items } = await this.getItems(
        this.paginator,
        this.sorting,
        this.filter
      );

      const params: ListParams<T> = {
        ...this.paginator,
        ...this.sorting,
        ...this.filter
      };

      if (this.destroyedComponent) return;
      await this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: params
      });

      this.items = items;
      this.total = total;
    } catch (err) {
      this.destroyedComponent;
      ToastDanger(
        `Não foi possível listar os registros`,
        ExtractErrorMessage(err)
      );
    }

    this.loading = false;
  }

  refreshItems(params: IPaginator & ISorting<any>) {
    this.paginator = {
      Page: params.Page,
      PageSize: params.PageSize
    };
    this.sorting = {
      SortColumn: (params as ISorting<T>).SortColumn,
      SortDirection: params.SortDirection
    };
    this.list();
  }

  prepareFilter(oldFilter: IFilter, newFilter: IFilter) {
    const filter = { ...oldFilter, ...newFilter };

    const filterKeys = Object.keys(filter);
    for (const key of filterKeys) {
      if (
        filter[key] === undefined ||
        filter[key] === null ||
        filter[key] === ''
      ) {
        delete filter[key];
      }
    }

    this.hasFilter = !!Object.keys(filter).length;

    this.filter = filter;
  }

  async openFilter() {
    const retorno = await ModalPresentUtil(this.modalCtrl, FilterModal, {
      controls: this.filterControls,
      filter: this.filter,
      headerColor: this.headerFilterColor
    });

    if (retorno.role === ModalCloseStatus.CONFIRM) {
      this.prepareFilter({}, retorno.data);
      this.paginator.Page = 1;
      this.list();
    }
  }
}
