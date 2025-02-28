import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'sheetjs-style-v2';
import {
  IColumn,
  IGroupColumn,
  IPaginator,
  ISorting,
  PAGE_SIZES,
  SortDirection,
} from '.';
import { ToastDanger, ToastWarning } from '../../utils/toast.utils';

@Component({
  selector: 'app-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges, OnDestroy {
  @Input() singleRowColumns: IColumn[] = [];
  @Input() multiRowColumns: IColumn[] = [];
  @Input() multiRowColumnKey: string;
  @Input() groupColumns: IGroupColumn[] = [];
  @Input() items = [];
  @Input() paginator: IPaginator;
  @Input() sorting: ISorting<any>;
  @Input() total = 0;
  @Input() loading = false;
  @Input() hasFilter = true;
  @Output() doRefresh = new EventEmitter<IPaginator & ISorting<any>>();

  @ViewChild('gridTable', { static: true })
  gridTable: ElementRef<HTMLTableElement>;

  @ViewChild('card', { static: true })
  card: { el: HTMLElement };

  @ViewChild('cardContent', { static: true })
  cardContent: { el: HTMLElement };

  pageSizes = PAGE_SIZES;

  cardContentResize$: ResizeObserver;

  sortDirection = SortDirection;

  exporting = false;

  maxLabelLength: number;

  debouncePaginator = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.cardContentResize$ = new ResizeObserver((entries) => {
      this.validateCardHeight();
    });
    this.cardContentResize$.observe(this.cardContent.el);
  }

  async resetUrlGridParams() {
    await this.router.navigate([], {});
    location.reload();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.cardContent.el.style.maxHeight = 'none';
    this.maxLabelLength = [...this.singleRowColumns, ...this.multiRowColumns]
      .length
      ? [...this.singleRowColumns, ...this.multiRowColumns]
          .map((column) => column.Label.length)
          .reduce((a, b) => (a > b ? a : b))
      : 0;
  }

  ngOnDestroy(): void {
    this.cardContentResize$.disconnect();
  }

  validateCardHeight() {
    const cardContent = this.cardContent.el;
    const offsetHorizontalScroll =
      cardContent.scrollWidth > cardContent.clientWidth ? 16 : 0;
    if (this.paginator) {
      this.card.el.style.height =
        cardContent.scrollHeight + offsetHorizontalScroll + 54 + 'px';
      cardContent.style.maxHeight = 'calc(100% - 54px)';
    } else {
      this.card.el.style.height =
        cardContent.scrollHeight + offsetHorizontalScroll + 'px';
      cardContent.style.maxHeight = '100%';
    }
  }

  updatePaginator(paginator: IPaginator) {
    if(this.debouncePaginator) {
      return;
    }
    this.debouncePaginator = true;

    setTimeout(() => {
      this.debouncePaginator = false;
    }, 200);

    this.paginator = paginator;
    this.doRefreshPropagate();
  }

  updateSort(column: string, noSort: boolean) {
    if (noSort) {
      return;
    }

    if (this.sorting.SortColumn === column) {
      this.sorting.SortDirection =
        this.sorting.SortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC;
    } else {
      this.sorting = {
        SortColumn: column,
        SortDirection: SortDirection.ASC,
      };
    }

    this.doRefreshPropagate();
  }

  doRefreshPropagate() {
    this.doRefresh.emit({ ...this.paginator, ...this.sorting });

    this.cardContent.el.style.maxHeight = 'none';
  }

  async sleep(seconds: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  async exportToExcel(filename = 'exportacao', type = 'xlsx') {
    if (!this.items?.length) {
      return ToastDanger('A listagem atual não contém nenhum registro');
    }

    this.exporting = true;

    await this.sleep(0.5);

    if (this.paginator?.PageSize) {
      ToastWarning(
        'Exportação parcial',
        'A exportação conteve somente os registros da página atual'
      );
    }

    const dataAtual = new Date().toISOString().substring(0, 10);
    const sheetName = 'exportado em ' + dataAtual;

    const ws = XLSX.utils.table_to_sheet(this.gridTable.nativeElement, {
      raw: true,
    });

    const maxLengthCols = {};

    for (const i in ws) {
      if (typeof ws[i] != 'object' || Array.isArray(ws[i])) {
        continue;
      }

      const row = +i.substring(1);
      const col = i.substring(0, 1);
      const value = ws[i].v + '';

      if (!Number.isNaN(+value)) {
        ws[i].t = 'n';
      }

      if (!maxLengthCols[col]) {
        maxLengthCols[col] = 0;
      }

      if (
        maxLengthCols[col] < value.length &&
        ((row !== 1 && this.groupColumns?.length) || !this.groupColumns?.length)
      ) {
        maxLengthCols[col] = value.length;
        if (maxLengthCols[col] > 50) {
          maxLengthCols[col] = 50;
        }
      }

      ws[i].s = {
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: true,
        },
        font: {
          bold: row === 1 || (row === 2 && this.groupColumns?.length),
        },
      };
    }

    ws['!cols'] = [];

    for (const i of Object.keys(maxLengthCols).sort((a, b) =>
      a.localeCompare(b)
    )) {
      ws['!cols'].push({ width: maxLengthCols[i] + 2 });
    }

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, filename.toLowerCase() + '.' + type);

    this.exporting = false;
  }
}
