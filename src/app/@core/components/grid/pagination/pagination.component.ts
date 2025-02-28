import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPaginator, PAGE_SIZES } from '..';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() paginator: IPaginator;
  @Input() total = 0;
  @Output() doRefresh = new EventEmitter<IPaginator>();

  pageSizes = PAGE_SIZES;

  constructor() {}

  get isFirstPage() {
    return this.paginator.PageSize * (this.paginator.Page - 1) + 1 === 1;
  }

  get isLastPage() {
    return this.paginator.PageSize * this.paginator.Page >= this.total;
  }

  doRefreshPropagate() {
    this.doRefresh.emit({ ...this.paginator });
  }

  changePage(direction?: number) {
    this.paginator.Page = this.paginator.Page + direction;
    this.doRefreshPropagate();
  }

  changePageSize(pageSize?: Event) {
    this.paginator.PageSize = (pageSize as CustomEvent).detail.value;
    this.paginator.Page = 1;
    this.doRefreshPropagate();
  }
}
